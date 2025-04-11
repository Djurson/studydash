"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { ChevronDown, Minus, CircleAlert, AlertCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { Course, CourseJSON, Examination, ExaminationJSON } from "@/utils/types";
import { Status, StatusSquare } from "./statussquare";
import { useStudyResult } from "@/hooks/editcontext";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
import { UpdateExamResult, ValidateDate, ValidateGrade } from "@/utils/utils";
import { getTodayFormatted } from "@/utils/validateDateGrade";
import { CreateEmptyExamination, CreateEmptyCourse } from "@/utils/utils";

export function EditCourse({ course }: { course: CourseJSON }) {
  const [isOpen, setIsOpen] = useState(false);
  const { studyResults, setStudyResults } = useStudyResult();
  const [grade, setGrade] = useState<string | undefined>(undefined);

  // Om användaren öppnar drawer:n så skapas kursen i studyresults (om det inte finns redan)
  useEffect(() => {
    if (!studyResults.has(course.course_code)) {
      studyResults.set(course.course_code, CreateEmptyCourse());
    }
  }, []);

  useEffect(() => {
    setGrade(studyResults.get(course.course_code)?.grade.toString());
  }, [course.course_code, studyResults.get(course.course_code), course.examinations, status]);
  // TODO:
  // Uppdatera date i kursen beroende på vilken examination som lades till senast om alla examinationer finns med
  return (
    <>
      <div className="flex flex-col">
        <div className="flex relative">
          <div className="absolute left-[0.563rem] top-0 bottom-0 w-px bg-gray-300 z-0" />
          <div className="flex flex-col pl-[1.125rem]">
            <button className="grid grid-cols-10 grid-rows-1 w-full text-left items-center py-2" onClick={() => setIsOpen(!isOpen)}>
              <div className="col-start-1 col-span-8 flex gap-4 items-center">
                <StatusSquare status={!grade ? "ongoing" : grade != "0" ? "done" : "ongoing"} />

                <h4 className="font-medium text-sm">
                  {course.name} - {course.course_code}
                </h4>
              </div>

              <div className="flex gap-2 text-sm items-center text-gray-600 font-light">
                {/*<div className="h-7 aspect-square border-1 border-green-900 rounded-sm"></div>*/}
                <p>Slutbetyg: </p>
                <InputOTP maxLength={1} disabled value={grade === "0" ? "x" : grade}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} placeholder="x" className="text-sm h-6" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <ChevronDown size={24} className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
            </button>
            <section className="flex flex-col w-full">
              {isOpen &&
                course.examinations
                  .filter((e) => Number.parseFloat(e.credits.replace("hp", "").trim()) > 0)
                  .map((exam) => {
                    return <CourseExaminationMapping key={exam.code} exam={exam} course={course} setStudyResults={setStudyResults} studyResults={studyResults} />;
                  })}
            </section>
            <Separator />
          </div>
        </div>
      </div>
    </>
  );
}

function CourseExaminationMapping({
  exam,
  course,
  setStudyResults,
  studyResults,
}: {
  exam: ExaminationJSON;
  course: CourseJSON;
  setStudyResults: Dispatch<SetStateAction<Map<string, Course>>>;
  studyResults: Map<string, Course>;
}) {
  const [dateError, setDateError] = useState<string | null>(null);
  const [gradeError, setGradeError] = useState<string | null>(null);
  const [dateFocused, setDateFocused] = useState(false);
  const [gradeFocused, setGradeFocused] = useState(false);
  const [examDate, setExamDate] = useState<string | undefined>("");
  const [examGrade, setExamGrade] = useState<string | undefined>("");

  // Om användaren öppnar drawer:n så skapas examinationsmomentet i studyresults (om det inte finns redan)
  useEffect(() => {
    if (!studyResults.get(course.course_code)?.examinations.has(exam.code)) {
      studyResults.get(course.course_code)?.examinations.set(exam.code, CreateEmptyExamination());
    }
  }, []);

  useEffect(() => {
    setExamDate(studyResults.get(course.course_code)?.examinations.get(exam.code)?.date);
    setExamGrade(studyResults.get(course.course_code)?.examinations.get(exam.code)?.grade.toString());
  }, [exam.code, course.course_code, studyResults]);

  const HandleDateChange = (value: string) => {
    setDateError(null);
    const error = ValidateDate(value, "20220801", getTodayFormatted());

    if (error) {
      setDateError(error);
    }

    const dateUpdate: Partial<Examination> = {
      date: value,
    };
    setStudyResults((prev) => UpdateExamResult(prev, course, exam, dateUpdate));
  };

  const HandleGradeChange = (value: string) => {
    setGradeError(null);
    const error = ValidateGrade(value, exam);

    if (error) {
      setGradeError(error);
    }

    let examgrade: string | number;
    if (value === "G" || value === "D") examgrade = value;
    else {
      examgrade = Number(value);
    }

    const gradeUpdate: Partial<Examination> = {
      grade: examgrade,
    };

    setStudyResults((prev) => UpdateExamResult(prev, course, exam, gradeUpdate));
  };

  const status: Status = gradeError || dateError ? "error" : examDate?.length === 8 && examGrade?.length === 1 ? "done" : "ongoing";

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex relative w-full">
          <div className="absolute left-[0.469rem] top-0 bottom-0 w-px bg-gray-300 z-0" />
          <div className="flex flex-col pl-[1.125rem] w-full">
            <div className="w-full">
              <div className="flex gap-4 py-2">
                <div className=" flex items-center">
                  <StatusSquare status={status} />
                </div>
                <p className="text-sm font-normal">
                  {exam.name} - {exam.code}
                </p>
                <p className="text-gray-600 self-center text-sm font-light text-right flex-2 pr-8">{exam.credits}</p>
              </div>

              <div className="flex gap-18 justify-between py-2 px-8 w-full">
                <div className="flex flex-col gap-1 items-start text-sm">
                  <div className="flex gap-2 items-center justify-start text-sm">
                    <p>Datum:</p>
                    <InputOTP
                      maxLength={8}
                      onChange={HandleDateChange}
                      value={examDate}
                      onBlur={() => setDateFocused(true)}
                      onFocus={() => setDateFocused(false)}
                      error={dateFocused ? dateError : null}>
                      <InputOTPGroup className={`${dateError && dateFocused ? "animate-shake-forwards" : ""}`}>
                        <InputOTPSlot index={0} placeholder="Y" hasError={!!dateError && !!dateFocused} />
                        <InputOTPSlot index={1} placeholder="Y" hasError={!!dateError && !!dateFocused} />
                        <InputOTPSlot index={2} placeholder="Y" hasError={!!dateError && !!dateFocused} />
                        <InputOTPSlot index={3} placeholder="Y" hasError={!!dateError && !!dateFocused} />
                      </InputOTPGroup>
                      <InputOTPSeparator className={`${dateError && dateFocused ? "animate-shake-forwards" : ""}`} />
                      <InputOTPGroup className={`${dateError && dateFocused ? "animate-shake-forwards" : ""}`}>
                        <InputOTPSlot index={4} placeholder="M" hasError={!!dateError && !!dateFocused} />
                        <InputOTPSlot index={5} placeholder="M" hasError={!!dateError && !!dateFocused} />
                      </InputOTPGroup>
                      <InputOTPSeparator className={`${dateError && dateFocused ? "animate-shake-forwards" : ""}`} />
                      <InputOTPGroup className={`${dateError && dateFocused ? "animate-shake-forwards" : ""}`}>
                        <InputOTPSlot index={6} placeholder="D" hasError={!!dateError && !!dateFocused} />
                        <InputOTPSlot index={7} placeholder="D" hasError={!!dateError && !!dateFocused} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {dateError && dateFocused && (
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} color="#f36961" />
                      <p className="text-red-900">{dateError}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 items-end justify-start text-sm">
                  <div className="flex gap-2 items-center justify-start text-sm">
                    <p>Betyg:</p>
                    <InputOTP
                      maxLength={1}
                      onChange={HandleGradeChange}
                      value={examGrade}
                      onBlur={() => setGradeFocused(true)}
                      onFocus={() => setGradeFocused(false)}
                      error={gradeFocused ? gradeError : null}>
                      <InputOTPGroup className={`${gradeError && gradeFocused ? "animate-shake-forwards" : ""}`}>
                        <InputOTPSlot index={0} placeholder="x" hasError={!!gradeError && !!gradeFocused} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {gradeError && gradeFocused && (
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} color="#f36961" />
                      <p className="text-red-900">{gradeError}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
