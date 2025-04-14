"use client";

import { useState, useEffect, useMemo, memo } from "react";
import { ChevronDown } from "lucide-react";
import { Separator } from "../ui/separator";
import { Course, CourseJSON } from "@/utils/types";
import { Status, StatusSquare } from "./statussquare";
import { useStudyResults } from "@/hooks/editcontext";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { CourseExaminationMapping } from "./editexam";

export function EditCourse({ course }: { course: CourseJSON }) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateCourseResult, getCourse } = useStudyResults();
  const [grade, setGrade] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<Status>("none");

  const courseResults = getCourse(course.course_code);
  const { returnGrade, returnStatus } = useMemo(() => {
    return CheckGradeAndStatus(course, courseResults, updateCourseResult);
  }, [course, courseResults]);

  useEffect(() => {
    setStatus(returnStatus);
    if (returnGrade !== undefined) {
      setGrade(returnGrade.toString());
    }
  }, [returnGrade, returnStatus]);

  // TODO:
  // Uppdatera date i kursen beroende på vilken examination som lades till senast om alla examinationer finns med
  // Separera så att kurs betyg, examinationer endast är ett objekt här som vi sedan skickar ner genom props till editexam.tsx
  // För att endast rerendera de kurser som ändras och INTE alla kurser som är beroende av study results
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
                <div className="flex items-center gap-2">
                  {/*
                  <p className="text-sm items-center text-accent-foreground font-light">Slutbetyg: </p>
                  <InputOTP maxLength={1} disabled value={grade === "" ? "x" : grade}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} placeholder="x" className="text-sm h-6" />
                    </InputOTPGroup>
                  </InputOTP>
                  */}
                  {grade && grade !== "" ? (
                    <div className="flex items-center">
                      <div className="border-1 border-green-900 rounded-xl px-2 py-1 ">
                        <p className="text-sm items-center text-green-900">Betyg {grade}</p>
                      </div>
                    </div>
                  ) : null}

                  <ChevronDown size={24} className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
                </div>
              </div>
            </button>
            {isOpen && (
              <section className="flex flex-col w-full pb-2">
                {course.examinations
                  .filter((e) => Number.parseFloat(e.credits.replace("hp", "").replace(",", ".").trim()) > 0)
                  .map((exam) => (
                    <CourseExaminationMapping key={exam.code} exam={exam} course={course} />
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

function CheckGradeAndStatus(
  course: CourseJSON,
  resultsCourse: Course | undefined,
  updateCourse: (CourseJSON: CourseJSON, updates: Partial<Course>) => void
): { returnGrade: string | number | undefined; returnStatus: Status } {
  if (!resultsCourse || !resultsCourse.examinations) {
    return {
      returnGrade: undefined,
      returnStatus: "ongoing",
    };
  }

  let finalgrade = 0;
  let total = 0;
  let stringGradePassed = false;

  if (course.examinations.length === 1) {
    let grade = resultsCourse.examinations.get(course.examinations[0].code)?.grade;

    if (!grade || grade == "") {
      return {
        returnGrade: undefined,
        returnStatus: "ongoing",
      };
    }

    let dateExam = resultsCourse.examinations.get(course.examinations[0].code)?.date;

    if (dateExam && Number.parseInt(dateExam) > Number.parseInt(resultsCourse.date)) {
      const updates: Partial<Course> = {
        date: dateExam,
      };

      updateCourse(course, updates);
    }

    return {
      returnGrade: grade,
      returnStatus: "done",
    };
  }

  let date = 0;
  for (let i = 0; i < course.examinations.length; i++) {
    if (course.examinations[i].credits === "0 hp") {
      continue;
    }

    let grade = resultsCourse.examinations.get(course.examinations[i].code)?.grade;

    if (typeof grade === "undefined") {
      return {
        returnGrade: undefined,
        returnStatus: "ongoing",
      };
    }

    if (typeof grade === "string") {
      if (grade === "G" || grade === "D") {
        let dateExam = resultsCourse.examinations.get(course.examinations[i].code)?.date;
        if (dateExam && Number.parseInt(dateExam) > date) {
          date = Number.parseInt(dateExam);
        }
        stringGradePassed = true;
        continue;
      }
      return {
        returnGrade: undefined,
        returnStatus: "ongoing",
      };
    }

    finalgrade += grade;
    total++;
  }

  if (finalgrade != 0) {
    finalgrade = Math.round(finalgrade / total);
    if (date > Number.parseInt(resultsCourse.date)) {
      const updates: Partial<Course> = {
        date: date.toString(),
      };
      updateCourse(course, updates);
    }
    return {
      returnGrade: finalgrade,
      returnStatus: "done",
    };
  }

  if (stringGradePassed && finalgrade === 0) {
    if (date > Number.parseInt(resultsCourse.date)) {
      const updates: Partial<Course> = {
        date: date.toString(),
      };
      updateCourse(course, updates);
    }
    return {
      returnGrade: "G",
      returnStatus: "done",
    };
  }

  return {
    returnGrade: undefined,
    returnStatus: "ongoing",
  };
}

export default memo(EditCourse);
