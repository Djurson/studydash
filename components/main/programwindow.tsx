"use client";
import CardCarousel from "../card/card-carousel";
import { WithAuthProps } from "@/utils/types";
import { MapHasExamination } from "@/utils/utils";
import userProgram from "../utils/userProgram";
import { useState } from "react";

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

type Term = "termin7" | "termin8" | "termin9";

//stulen funktion från en tidigare modul för att hitta nuvarande år med nuvarande kurse
function getCurrentStudyYear() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Om nuvarande månad är mindre än före augusti (månad 7 (börjar på 0)), dra av 1 från året
  const studyYear = currentMonth < 7 ? currentYear - 1 : currentYear;

  return {
    current: `${studyYear + 1}`,
    start: new Date(studyYear, 7, 1),
    end: new Date(studyYear + 1, 6, 31),
  };
}

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

// sorterar och skapar nya maps baserat på användarens år samt vilka kurser har inte har ett betyg i något ämne
export default function ProgramWindow({ userData }: Partial<WithAuthProps>) {
  const program = userProgram(userData);
  
  // Move selectedCourses state inside the component
  const [selectedCourses] = useState<{
    termin7: Course[];
    termin8: Course[];
    termin9: Course[];
  }>(loadSelectedCourses());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentCoursesArray: any[] = [];
  const missedExams = new Map();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nonPassingMissedExams: any[] = [];

  const currentTerm = getCurrentStudyYear();

  // Helper function to group courses by semester
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

  program.semesters.forEach((semester) => {
    if (semester.name.includes(currentTerm.current)) {
      semester.courses.forEach((courses) => {
        //en array med nuvarande kurser
        currentCoursesArray.push({ courses, semester });
      });
    }
    semester.courses.forEach((courses) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      courses.examinations.forEach((exam: any, index: any) => {
        //kollar om användaren har en examination kvar
        if (!MapHasExamination(userData?.studyinfo ?? new Map(), courses.course_code, exam.code)) {
          //kollar om mapen redan har kursen, i sånt fall läger den till andra examinationer på den keyn
          if (missedExams.has(courses.course_code)) {
            missedExams.get(courses.course_code).push({ name: exam.code, credits: exam.credits });
          }
          //annars om mappen inte har den key så skapar den en ny key samt en array som displayar alla kurser med examinationer i sig, skulle kunnas göras bättre men funkar för nuläget
          else {
            missedExams.set(courses.course_code, [{ name: exam.code, credits: exam.credits }]);
            nonPassingMissedExams.push({ index: index++, name: courses.name, course_code: courses.course_code, examcode: exam.code, credits: exam.code });
          }
        }
      });
    });
  });

  // Filter current master courses based on current term
  const currentMasterCourses: Course[] = [];
  const validTerms = ["termin 7", "termin 8", "termin 9"];

  groupedMasterCourses.forEach((courses, semesterName) => {
    if (validTerms.some(term => semesterName.toLowerCase().includes(term))) {
      currentMasterCourses.push(...courses);
    }
  });
  
  console.log("Current master courses found:", currentMasterCourses);

  return (
    <div className="flex flex-col gap-4 row-span-2 mt-2 h-[25rem]">
      <div className="flex flex-col row-span-1 gap-2 h-[45%]">
        <h3 className="text-sm text-gray-600">Nuvarande</h3>
        <hr className="w-full bg-gray-600"></hr>
        <div className="overflow-scroll no-scrollbar flex flex-col gap-2">
          {/* Display regular program courses */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {currentCoursesArray.map((item: any, index: any) => (
            //loopar igenom alla nuvarande kurser
            <a
              className="flex flex-col gap-2"
              key={index}
              //använder sig av en link funktion tillsammans med indexs i programs för att öppna och direkta till rätt dropdown för det klickade programmet
              href={`/program#${encodeURIComponent(item.semester.name)}`}
              onClick={() => {
                // Small delay to ensure the hash change is processed
                setTimeout(() => {
                  const element = document.getElementById(encodeURIComponent(item.semester.name));
                  if (element) {
                    //ändrar hur sidan scrollar till det valda elementet
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                      inline: "nearest",
                    });
                  }
                }, 100);
              }}>
              <h3 className="text-sm font-semibold">{item.courses.name}</h3>
              <div className="flex flex-row justify-between w-full">
                <p className="text-xs text-gray-600">{item.courses.course_code}</p>
                <p className="text-xs text-gray-600">{item.courses.credits}</p>
              </div>
              <hr className="w-full bg-gray-600"></hr>
            </a>
          ))}

          {/* Display current master courses */}
          {currentMasterCourses.map((course, courseIndex) => (
            <div key={`current-master-${courseIndex}`} className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">{course.name}</h3>
              <div className="flex flex-row justify-between w-full">
                <p className="text-xs text-gray-600">{course.course_code}</p>
                <p className="text-xs text-gray-600">{course.credits}</p>
              </div>
              <p className="text-xs text-blue-600">Master Course - {course.semesterName}</p>
              <hr className="w-full bg-gray-600"></hr>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col row-span-1 gap-2 h-[48%]">
        <h3 className="text-gray-600 text-sm">Ej avklarade</h3>
        <hr className="w-full bg-gray-600"></hr>
        <div className="overflow-scroll no-scrollbar flex flex-col gap-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {nonPassingMissedExams.map((item: any, index: any) => (
            //loopar igenom alla missade examinationer
            <a
              className="flex flex-col gap-1"
              key={index}
              //använder sig av en link funktion tillsammans med indexs i programs för att öppna och direkta till rätt dropdown för det klickade programmet

              href={`/program#${encodeURIComponent(item.name)}`}
              onClick={() => {
                // Small delay to ensure the hash change is processed
                setTimeout(() => {
                  const element = document.getElementById(encodeURIComponent(item.name));
                  if (element) {
                    //ändrar hur sidan scrollar till det valda elementet

                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                      inline: "nearest",
                    });
                  }
                }, 100);
              }}>
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-600">{item.course_code}</p>
              {/*Kallar på cardCarousel för varje kurs med missade examinationer*/}
              <CardCarousel exam={missedExams.get(item.course_code)} />
              <hr className="w-full bg-gray-600"></hr>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}