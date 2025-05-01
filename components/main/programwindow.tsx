"use client";
import programData from "@/webscraping/6CEMEN-2022.json";
import exjobbData from "@/webscraping/Exjobb-engineers.json";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CardCarousel from "../card/card-carousel";
import { WithAuthProps } from "@/utils/types";
import { MapHasExamination } from "@/utils/utils";

interface Program {
  name: string;
  credits: string;
  url: string;
  semesters: Semester[];
}

interface Semester {
  name: string;
  courses: Course[];
}

interface Course {}


function getCurrentStudyYear(startYear: number) {
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

export default function ProgramWindow({ userData }: Partial<WithAuthProps>) {
  const program = programData.programs[0];
  const exjobb = exjobbData.programs[0];
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenExam, setIsOpenExam] = useState(true);

  var currentCoursesArray: any[] = [];
  var missedExams = new Map();
  var nonPassingMissedExams: any[] = [];

  const currentTerm = getCurrentStudyYear(Number(userData?.studyyear))

  program.semesters.forEach((semester) => {
    if (semester.name.includes(currentTerm.current)) {
      semester.courses.forEach((courses) => {
        currentCoursesArray.push({ courses, semester });
      });
    }
    semester.courses.forEach(courses => {
      courses.examinations.forEach((exam:any, index: any) => {
        if(!MapHasExamination(userData?.studyinfo!, courses.course_code, exam.code)){
          if(missedExams.has(courses.course_code)){
            missedExams.get(courses.course_code).push({name:exam.code, credits: exam.credits})
          }
          else{
            missedExams.set(courses.course_code, [{name: exam.code, credits: exam.credits}]);
            nonPassingMissedExams.push({index: index++, name: courses.name, course_code: courses.course_code, examcode: exam.code, credits:exam.code})

          }
        }
      })
    });
  });


  return (
    <div className="flex flex-col gap-4 mt-2 h-[24.25rem]">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-gray-600">Nuvarande</h3>
        <hr className="w-full bg-gray-600"></hr>
        <div
          className="overflow-scroll no-scrollbar flex flex-col gap-2 h-32"
        >
          {currentCoursesArray.map((item: any, index: any) => (
            <a
              className="flex flex-col gap-2"
              key={index}
              href={`/program#${encodeURIComponent(item.semester.name)}`}
              onClick={() => {
                // Small delay to ensure the hash change is processed
                setTimeout(() => {
                  const element = document.getElementById(
                    encodeURIComponent(item.semester.name)
                  );
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                      inline: "nearest",
                    });
                  }
                }, 100);
              }}
            >
              <h3 className="text-sm font-semibold">{item.courses.name}</h3>
              <div className="flex flex-row justify-between w-full">
                <p className="text-xs text-gray-600">
                  {item.courses.course_code}
                </p>
                <p className="text-xs text-gray-600">{item.courses.credits}</p>
              </div>
              <hr className="w-full bg-gray-600"></hr>
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <h3 className="text-gray-600 text-sm">Ej avklarade</h3>
        <hr className="w-full bg-gray-600"></hr>
        <div
          className="overflow-scroll no-scrollbar flex flex-col gap-2 h-40"
        >
          {nonPassingMissedExams.map((item: any, index: any) => (
            <a
              className="flex flex-col gap-1"
              key={index}
              href={`/program#${encodeURIComponent(item.name)}`}
              onClick={() => {
                // Small delay to ensure the hash change is processed
                setTimeout(() => {
                  const element = document.getElementById(
                    encodeURIComponent(item.name)
                  );
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                      inline: "nearest",
                    });
                  }
                }, 100);
              }}
            >
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-600">
                {item.course_code}
              </p>
              <CardCarousel exam={missedExams.get(item.course_code)} />
              <hr className="w-full bg-gray-600"></hr>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
