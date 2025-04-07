import { ChevronDown, CornerDownRight, CircleAlert } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  validateDate,
  validateGrade,
  getTodayFormatted,
} from "@/utils/validateDateGrade";

interface Course {
  name: string;
  course_code: string;
  credits: string;
  VOF: string;
  examinations: Examination[];
}

interface Examination {
  code: string;
  name: string;
  credits: string;
  grading: string;
}

export default function EditCourses({ course }: { course: Course }) {
  const [isOpen, setIsOpen] = useState(false);

  const [examInputs, setExamInputs] = useState<
    Record<
      string,
      {
        date: string;
        grade: string;
        dateError?: string;
        gradeError?: string;
      }
    >
  >({});

  // Hårdkodat startdatum (YYYYMMDD format)
  const programStartDate = "20220801";
  const todayFormatted = getTodayFormatted();

  console.log("todayFormatted", todayFormatted);

  return (
    <div className="overflow-hidden ">
      <button
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
      <section>
        {isOpen && (
          <div className=" overflow-hidden bg-white">
            {course.examinations
              .filter((exam) => exam.credits !== "0 hp")
              .map((exam) => (
                <div key={exam.code}>
                  <div className=" w-full text-left items-center py-2 pr-8">
                    <div className=" flex gap-4 items-center">
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex gap-4 items-center">
                          <div className="flex pl-8">
                            <div className="border-1 border-gray-900 rounded-sm h-[1rem] aspect-square"></div>
                          </div>
                          <p className="text-xs">
                            {exam.name} - {exam.code}
                          </p>
                        </div>
                        <div>
                          <div className="pl-16 flex items-center justify-between">
                            <div>
                              <div className="flex items-center focus:outline-none">
                                <p className="text-xs text-gray-600 mr-2">
                                  Datum:
                                </p>
                                <InputOTP
                                  maxLength={8}
                                  value={examInputs[exam.code]?.date || ""}
                                  onChange={(value) => {
                                    const dateError = validateDate(
                                      value,
                                      programStartDate,
                                      todayFormatted
                                    );
                                    setExamInputs((prev) => ({
                                      ...prev,
                                      [exam.code]: {
                                        ...prev[exam.code],
                                        date: value,
                                        dateError: dateError,
                                      },
                                    }));
                                  }}>
                                  <InputOTPGroup
                                    className={
                                      examInputs[exam.code]?.dateError
                                        ? "border-red-500"
                                        : ""
                                    }>
                                    <InputOTPSlot index={0} placeholder="y" />
                                    <InputOTPSlot index={1} placeholder="y" />
                                    <InputOTPSlot index={2} placeholder="y" />
                                    <InputOTPSlot index={3} placeholder="y" />
                                  </InputOTPGroup>
                                  <InputOTPSeparator />
                                  <InputOTPGroup
                                    className={
                                      examInputs[exam.code]?.dateError
                                        ? "border-red-500"
                                        : ""
                                    }>
                                    <InputOTPSlot index={4} placeholder="m" />
                                    <InputOTPSlot index={5} placeholder="m" />
                                  </InputOTPGroup>
                                  <InputOTPSeparator />
                                  <InputOTPGroup
                                    className={
                                      examInputs[exam.code]?.dateError
                                        ? "border-red-500"
                                        : ""
                                    }>
                                    <InputOTPSlot index={6} placeholder="d" />
                                    <InputOTPSlot index={7} placeholder="d" />
                                  </InputOTPGroup>
                                </InputOTP>
                              </div>
                              {examInputs[exam.code]?.dateError && (
                                <div className="flex items-center gap-1 text-xs text-red-500 mt-1 col-start-1 col-span-5">
                                  <CircleAlert size={14} />
                                  <p>{examInputs[exam.code]?.dateError}</p>
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="flex items-center">
                                <p className="text-xs text-gray-600 mr-2">
                                  Betyg:
                                </p>
                                <InputOTP
                                  maxLength={1}
                                  value={examInputs[exam.code]?.grade || ""}
                                  onChange={(value) => {
                                    const gradeError = validateGrade(
                                      value,
                                      exam
                                    );
                                    setExamInputs((prev) => ({
                                      ...prev,
                                      [exam.code]: {
                                        ...prev[exam.code],
                                        grade: value,
                                        gradeError: gradeError,
                                      },
                                    }));
                                  }}>
                                  <InputOTPGroup
                                    className={
                                      examInputs[exam.code]?.gradeError
                                        ? "border-red-500"
                                        : ""
                                    }>
                                    <InputOTPSlot index={0} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </div>
                              {examInputs[exam.code]?.gradeError && (
                                <div className="flex items-center gap-1 text-xs text-red-500 mt-1 col-start-1 col-span-5">
                                  <CircleAlert size={14} />
                                  <p>{examInputs[exam.code]?.gradeError}</p>
                                </div>
                              )}
                            </div>

                            <p className="text-xs text-gray-600">
                              {parseFloat(exam.credits) > 0 &&
                                `${exam.credits}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pl-8 last:invisible">
                    <Separator />
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      <div className="pl-4">
        <Separator />
      </div>
    </div>
  );
}
