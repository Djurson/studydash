"use client";
// Funktionerna för att generera och hämta terminer som inte mappas från json
import { generateAllSemesters } from "@/utils/semesterDates";
import Semester from "@/components/program/semester";
import userProgram from "../utils/userProgram";
import thesisData from "@/webscraping/Exjobb-engineers.json";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { CourseJSON, UserData } from "@/utils/types";
import { MasterSemester } from "./mastersemester";

const loadSelectedCourses = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("selectedCourses");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.termin7 && parsed.termin8 && parsed.termin9) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved courses", e);
      }
    }
  }
  return { termin7: [], termin8: [], termin9: [] };
};

type Term = "termin7" | "termin8" | "termin9";

type Course = {
  name: string;
  course_code: string;
  credits: string;
  semesterName: string;
  availableTerms: Term[];
  overview?: {
    education_level?: string;
    main_subject?: string | string[];
  };
};

export default function SemesterSection({
  userData,
  mainSubjects,
  unfinishedCourses,
  finishedCourses,
  selected,
}: {
  userData: UserData | undefined;
  mainSubjects: Map<string, CourseJSON[]>;
  unfinishedCourses: CourseJSON[];
  finishedCourses: CourseJSON[];
  selected: string;
}) {
  const currentYear = new Date().getMonth() < 8 ? new Date().getFullYear() - 1 : new Date().getFullYear();
  const startYear = userData?.studyyear;

  const startingSemester = startYear ? `HT ${startYear}` : `HT ${currentYear}`;
  const allSemesters = generateAllSemesters(startingSemester);
  const finalThesisSemester = allSemesters[9];

  const [, setAvailableSubjects] = useState<string[]>([]);
  const [selectedCourses] = useState<{
    termin7: Course[];
    termin8: Course[];
    termin9: Course[];
  }>(loadSelectedCourses());

  let semesterCount = -1;
  const program = userProgram(userData);

  const thsesis = {
    ...thesisData.programs[0],
    semesters: thesisData.programs[0].semesters.map((semester) => ({
      ...semester,
      name: `Termin 10 ${finalThesisSemester.fullString}`,
    })),
  };

  useEffect(() => {
    if (mainSubjects) {
      const subjects = Array.from(mainSubjects.keys());
      setAvailableSubjects(["Alla", "Avklarade", "Oavklarade", ...subjects]);
    }
  }, [mainSubjects]);

  const getFilteredSubjects = () => {
    const filteredSubjects = new Map<string, CourseJSON[]>();

    if (selected === "Oavklarade") {
      filteredSubjects.set(selected, unfinishedCourses);
    } else if (selected === "Avklarade") {
      filteredSubjects.set(selected, finishedCourses);
    } else {
      // Filter by specific subject
      const specificSubject = mainSubjects.get(selected);
      if (specificSubject) {
        filteredSubjects.set(selected, specificSubject);
      }
    }
    return filteredSubjects;
  };

  const filteredSubjects = getFilteredSubjects();

  // Group selected courses by semesterName
  const groupCoursesBySemester = () => {
    const allCourses = [...selectedCourses.termin7, ...selectedCourses.termin8, ...selectedCourses.termin9];

    const groupedCourses = new Map<string, Course[]>();

    allCourses.forEach((course) => {
      const semesterName = course.semesterName;
      if (!groupedCourses.has(semesterName)) {
        groupedCourses.set(semesterName, []);
      }
      groupedCourses.get(semesterName)!.push(course);
    });

    return groupedCourses;
  };

  const groupedMasterCourses = groupCoursesBySemester();

  return (
    <>
      <main className="flex flex-col gap-4">
        <section>
          <Separator />

          <div className="flex flex-col gap-4 mt-4">
            {selected === "Alla"
              ? program!.semesters!.map((semester) => {
                  semesterCount += 1;
                  return <Semester key={semester.name} semester={semester} semsterSeason={allSemesters[semesterCount]} userData={userData} subjectfilter={false} />;
                })
              : Array.from(filteredSubjects!.keys()).map((subject: string) => {
                  semesterCount += 1;
                  return (
                    <Semester
                      key={subject}
                      semester={{ name: subject, courses: filteredSubjects!.get(subject) ?? [] }}
                      semsterSeason={allSemesters[semesterCount]}
                      userData={userData}
                      subjectfilter={true}
                    />
                  );
                })}
          </div>
        </section>

        <Separator />
        <section className="flex flex-col gap-4">
          {selected !== "Alla" ? (
            <> {/* Ska inte visa något i sånna fall*/}</>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {Array.from(groupedMasterCourses.entries()).map(([semesterName, courses]) => (
                  <MasterSemester key={semesterName} semesterName={semesterName} courses={courses} userData={userData} subjectfilter={false} />
                ))}
              </div>
              <div className="flex flex-col gap-4 pb-4">
                {thsesis.semesters.map((semester) => (
                  <Semester key={semester.name} semester={semester} semsterSeason={allSemesters[9]} userData={userData} subjectfilter={false} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
