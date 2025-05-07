"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Separator } from "../ui/separator";
import { Course, CourseJSON, UserData } from "@/utils/types";
import { Status, StatusSquare } from "../edit/statussquare";

import { SemesterInfo } from "@/utils/semesterDates";
import { Exams } from "./exams";

export function Courses({ course, semesterStatus, semesterSeason, userData }: { course: CourseJSON; semesterStatus: Status; semesterSeason: SemesterInfo; userData: UserData | undefined }) {
  const [isOpen, setIsOpen] = useState(false);

  const grade = userData?.studyinfo.get(course.course_code)?.grade;
  const date = userData?.studyinfo.get(course.course_code)?.date;

  const status = grade && date ? "done" : semesterStatus;
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex relative w-full">
          <div className="absolute left-[0.563rem] top-0 bottom-0 w-px bg-secondary z-0" />
          <div className="flex flex-col pl-[1.125rem] w-full">
            <button className=" w-full text-left items-center py-2 hover:bg-highlight-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              <div className="flex justify-between flex-row gap-4 items-center">
                <div className="flex gap-4 items-center">
                  <StatusSquare status={status} />

                  <h4 className="font-medium text-sm">
                    {course.name} - {course.course_code}
                  </h4>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-29">
                    {grade && grade !== "" ? (
                      <div className="flex items-center">
                        <div className="border-1 border-green-900 rounded-xl px-2 py-1 ">
                          <p className="text-sm items-center text-green-900">Betyg {grade}</p>
                        </div>
                      </div>
                    ) : null}
                    <div>
                      <p className="font-medium text-sm w-13 text-right">{course.credits}</p>
                    </div>
                  </div>

                  <ChevronDown size={24} className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
                </div>
              </div>
            </button>
            {isOpen && (
              <section className="flex flex-col w-full pb-2 pr-10">
                {course.examinations
                  .filter((e) => Number.parseFloat(e.credits.replace("hp", "").replace(",", ".").trim()) > 0)
                  .map((exam) => (
                    <Exams key={exam.code} exam={exam} course={course} semesterStatus={semesterStatus} semesterSeason={semesterSeason} userData={userData} />
                  ))}
              </section>
            )}
            <Separator />
          </div>
        </div>
      </div>
    </>
  );
}
