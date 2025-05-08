"use client";
// Funktionerna för att generera och hämta terminer som inte mappas från json
import { generateAllSemesters, getSemestersInRange } from "@/utils/semesterDates";
import Semester from "@/components/program/semester";

import programData from "@/webscraping/6CEMEN-2022.json";
import thesisData from "@/webscraping/Exjobb-engineers.json";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Course, CourseJSON, UserData } from "@/utils/types";
import MasterSemester from "./mastersemester";

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
  const showFrom = 7;
  const showTo = 9;
  const allSemesters = generateAllSemesters(startingSemester);
  const masterSemesters = getSemestersInRange(startingSemester, showFrom, showTo);
  const finalThesisSemester = allSemesters[9];
  const pillbutton = false;

  const [filter, setFilter] = useState(selected);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

  let semesterCount = -1;
  const program = programData.programs[0];

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


  return (
    <>
      <main className="flex flex-col gap-4">
        <section>
          <Separator />

          <div className="flex flex-col gap-4 mt-4">
            {selected === "Alla"
              ? program.semesters.map((semester) => {
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
                {masterSemesters.map((semester, index) => (
                  <MasterSemester key={semester.fullString} semester={semester} index={index + showFrom - 1} />
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
