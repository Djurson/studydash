"use client";

import { useState, Dispatch, SetStateAction, useEffect, ChangeEvent } from "react";
import { ChevronDown, Minus } from "lucide-react";
import { Separator } from "../ui/separator";
import { Course, CourseJSON, Examination, ExaminationJSON } from "@/utils/types";
import { StatusSquare } from "./statussquare";
import { useStudyResult } from "./editcontext";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
import { UpdateExamResult, UpdateMap, ValidateDate, ValidateGrade } from "@/utils/utils";
import { getTodayFormatted } from "@/utils/validateDateGrade";

export function EditCourse({ course }: { course: CourseJSON }) {
  const [isOpen, setIsOpen] = useState(false);

  // TODO:
  // Uppdatera date i kursen beroende på vilken examination som lades till senast om alla examinationer finns med

  return (
    <>
      <div className="overflow-hidden flex flex-col items-end">
        <button className="grid grid-cols-10 grid-rows-1 w-full text-left items-center py-2" onClick={() => setIsOpen(!isOpen)}>
          <div className="col-start-1 col-span-8 flex gap-4 items-center pl-4">
            <StatusSquare status="none" />

            <h4 className="font-medium text-sm">
              {course.name} - {course.course_code}
            </h4>
          </div>

          <div className="flex gap-2 text-sm items-center text-gray-100">
            <p>Slutbetyg: </p>
            <InputOTP maxLength={1} disabled>
              <InputOTPGroup>
                <InputOTPSlot index={0} placeholder="x" className="text-sm h-6" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <ChevronDown size={24} className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </button>
        <section className="flex flex-col w-[95%] gap-3">
          {isOpen &&
            course.examinations.filter((e) => Number.parseFloat(e.credits.replace("hp", "").trim()) > 0).map((exam) => {
              return <CourseExaminationMapping key={exam.code} exam={exam} course={course} />;
            })}
        </section>
        {!isOpen && (
          <Separator />
        )}
      </div>
    </>
  );
}

function CourseExaminationMapping({ exam, course }: { exam: ExaminationJSON; course: CourseJSON; }) {
  const { studyResults, setStudyResults } = useStudyResult();
  const [dateError, setDateError] = useState<string | null>(null);
  const [gradeError, setGradeError] = useState<string | null>(null);

  const HandleDateChange = (value: string) => {
    setDateError(null)
    const error = ValidateDate(value, "20220801", getTodayFormatted());
    if (error) { setDateError(error); return; };

    const dateUpdate: Partial<Examination> = {
      date: value
    }
    setStudyResults(prev => UpdateExamResult(prev, course, exam, dateUpdate));
  }

  const HandleGradeChange = (value: string) => {
    setGradeError(null);
    const error = ValidateGrade(value, exam);
    if (error) { setGradeError(error); return; };


    let examgrade: string | number;
    if (value === "G" || value === "D") examgrade = value;
    else {
      examgrade = Number(value);
    }

    const gradeUpdate: Partial<Examination> = {
      grade: examgrade
    }
    setStudyResults(prev => UpdateExamResult(prev, course, exam, gradeUpdate));
  }

  console.log(studyResults)

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-1">
        <div className="row-span-1 flex items-center gap-2">
          <StatusSquare />
          <Minus className="size-2 fill-gray-600" />
        </div>
        <div className="col-span-2 flex items-center gap-2 text-sm font-normal">
          <p>{exam.name}</p>
          <Minus className="size-2 fill-gray-600" />
          <p>{exam.code}</p>
        </div>
        <div className="col-start-2 row-start-2 flex gap-32">
          <div className="flex flex-col gap-1 items-start text-sm">
            <div className="flex gap-2 items-center justify-start text-sm">
              <p>Datum:</p>
              <InputOTP maxLength={8}
                name="date"
                onChange={HandleDateChange}
                value={studyResults.get(course.course_code)?.examinations.get(exam.code)?.date}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} placeholder="Y" />
                  <InputOTPSlot index={1} placeholder="Y" />
                  <InputOTPSlot index={2} placeholder="Y" />
                  <InputOTPSlot index={3} placeholder="Y" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={4} placeholder="M" />
                  <InputOTPSlot index={5} placeholder="M" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={6} placeholder="D" />
                  <InputOTPSlot index={7} placeholder="D" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p>{dateError}</p>
          </div>
          <div className="flex flex-col gap-1 items-start justify-start text-sm">
            <div className="flex gap-2 items-center justify-start text-sm">
              <p>Betyg:</p>
              <InputOTP maxLength={1}
                name="grade"
                onChange={HandleGradeChange}
                value={studyResults.get(course.course_code)?.examinations.get(exam.code)?.grade.toString()}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} placeholder="x" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p>{gradeError}</p>
          </div>
          <p className="text-gray-100 self-center text-sm font-light text-right">{exam.credits}</p>
        </div>
      </div >
      <Separator />
    </>
  );
}

/**
*          
 * 
 * <button
        className="grid grid-cols-10 grid-rows-1 w-full text-left items-center py-2"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="col-start-1 col-span-9 flex gap-4 items-center pl-4">
          <div className="flex">
            <div className="border-1 border-gray-900 rounded-sm h-[1rem] aspect-square"></div>
          </div>

          <h4 className="font-medium text-sm">
            {course.name} - {course.course_code}
          </h4>
        </div>

        <ChevronDown
          size={24}
          className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
 */
