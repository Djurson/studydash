import { ChevronDown, CornerDownRight, CircleAlert } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useState,
} from "react";
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
import { Course } from "@/utils/types";

type CourseProps = {
  name: string;
  course_code: string;
  credits: string;
  VOF: string;
  examinations: ExaminationProps[];
};

type ExaminationProps = {
  code: string;
  name: string;
  credits: string;
  grading: string;
};

export default function EditCourses({ course, courseResults, setCourseResults, }: { course: CourseProps; courseResults: Course[] | undefined; setCourseResults: Dispatch<SetStateAction<Course[] | undefined>>; }) {
  // courseResults innehåller alla kurs grejer man fyllt i är tanken och man använder setCourseResults för att sätta den till ett visst värde,
  // Måste vara på samma form som när man läser in en pdf

  const [isOpen, setIsOpen] = useState(false);

  const [examInputs, setExamInputs] = useState<
    Record<
      string,
      {
        date: string;
        grade: string;
        dateError?: string;
        gradeError?: string;
        dateTouched?: boolean;
        gradeTouched?: boolean;
        isComplete?: boolean;
      }
    >
  >({});

  const isInputValid = (code: string) => {
    const input = examInputs[code];
    return (
      input?.gradeTouched &&
      input?.dateTouched &&
      input.grade &&
      !input.gradeError &&
      input.date &&
      !input.dateError
    );
  };

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
<<<<<<< Updated upstream:components/edit/EditCourses.tsx
          className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
=======
          className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"
            }`}
>>>>>>> Stashed changes:components/edit/EditCourses - Old.tsx
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
                            <div
                              className={`border-1 rounded-sm h-[1rem] aspect-square ${examInputs[exam.code]?.isComplete
                                ? "bg-green-500"
                                : "border-gray-900"
                                }`}></div>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <p className="text-xs">
                              {exam.name} - {exam.code}
                            </p>
                            <div className="flex h-[1.75rem] items-center">
                              <p className="text-xs   text-gray-600">
                                {parseFloat(exam.credits) > 0 &&
                                  `${exam.credits}`}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="pl-16 flex gap-12">
                            <div>
                              <div className="flex items-center focus:outline-none">
                                <p className="text-xs text-gray-600 mr-2">
                                  Datum:
                                </p>
                                <InputOTP
                                  maxLength={8}
                                  value={examInputs[exam.code]?.date || ""}
                                  onChange={(value) => {
                                    setExamInputs((prev) => ({
                                      ...prev,
                                      [exam.code]: {
                                        ...prev[exam.code],
                                        date: value,
                                        dateError: undefined,
                                      },
                                    }));
                                  }}
                                  onBlur={() => {
                                    const date =
                                      examInputs[exam.code]?.date || "";
                                    const grade =
                                      examInputs[exam.code]?.grade || "";
                                    const gradeError =
                                      examInputs[exam.code]?.gradeError;
                                    const dateError = validateDate(
                                      examInputs[exam.code]?.date || "",
                                      programStartDate,
                                      todayFormatted
                                    );

                                    const isComplete =
                                      !!grade &&
                                      !gradeError &&
                                      !!date &&
                                      !dateError &&
                                      examInputs[exam.code]?.gradeTouched;

                                    setExamInputs((prev) => ({
                                      ...prev,
                                      [exam.code]: {
                                        ...prev[exam.code],
                                        dateTouched: true,
                                        dateError,
                                        isComplete,
                                      },
                                    }));
                                  }}>
                                  <InputOTPGroup>
                                    <InputOTPSlot
                                      index={0}
                                      placeholder="y"
                                      hasError={
                                        examInputs[exam.code]?.dateTouched &&
                                        !!examInputs[exam.code]?.dateError
                                      }
                                    />
                                    <InputOTPSlot
                                      index={1}
                                      placeholder="y"
                                      hasError={
                                        examInputs[exam.code]?.dateTouched &&
                                        !!examInputs[exam.code]?.dateError
                                      }
                                    />
                                    <InputOTPSlot
                                      index={2}
                                      placeholder="y"
                                      hasError={
                                        examInputs[exam.code]?.dateTouched &&
                                        !!examInputs[exam.code]?.dateError
                                      }
                                    />
                                    <InputOTPSlot
                                      index={3}
                                      placeholder="y"
                                      hasError={
                                        examInputs[exam.code]?.dateTouched &&
                                        !!examInputs[exam.code]?.dateError
                                      }
                                    />
                                  </InputOTPGroup>
                                  <InputOTPSeparator />
                                  <InputOTPGroup>
                                    <InputOTPSlot
                                      index={4}
                                      placeholder="m"
                                      hasError={
                                        examInputs[exam.code]?.dateTouched &&
                                        !!examInputs[exam.code]?.dateError
                                      }
                                    />
                                    <InputOTPSlot
                                      index={5}
                                      placeholder="m"
                                      hasError={
                                        examInputs[exam.code]?.dateTouched &&
                                        !!examInputs[exam.code]?.dateError
                                      }
                                    />
                                  </InputOTPGroup>
                                  <InputOTPSeparator />
                                  <InputOTPGroup>
                                    <InputOTPSlot
                                      index={6}
                                      placeholder="d"
                                      hasError={
                                        examInputs[exam.code]?.dateTouched &&
                                        !!examInputs[exam.code]?.dateError
                                      }
                                    />
                                    <InputOTPSlot
                                      index={7}
                                      placeholder="d"
                                      hasError={
                                        examInputs[exam.code]?.dateTouched &&
                                        !!examInputs[exam.code]?.dateError
                                      }
                                    />
                                  </InputOTPGroup>
                                </InputOTP>
                              </div>
                              {examInputs[exam.code]?.dateTouched &&
                                examInputs[exam.code]?.dateError && (
                                  <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                                    <CircleAlert size={14} />
                                    <p>{examInputs[exam.code]?.dateError}</p>
                                  </div>
                                )}
                            </div>

                            <div className="pr-4">
                              <div className="flex items-center">
                                <p className="text-xs text-gray-600 mr-2">
                                  Betyg:
                                </p>
                                <InputOTP
                                  maxLength={1}
                                  value={examInputs[exam.code]?.grade || ""}
                                  onChange={(value) => {
                                    setExamInputs((prev) => ({
                                      ...prev,
                                      [exam.code]: {
                                        ...prev[exam.code],
                                        grade: value,
                                        gradeError: undefined,
                                      },
                                    }));
                                  }}
                                  onBlur={() => {
                                    const date =
                                      examInputs[exam.code]?.date || "";
                                    const grade =
                                      examInputs[exam.code]?.grade || "";
                                    const dateError =
                                      examInputs[exam.code]?.gradeError;
                                    const gradeError = validateGrade(
                                      examInputs[exam.code]?.grade || "",
                                      exam
                                    );
                                    const isComplete =
                                      !!grade &&
                                      !gradeError &&
                                      !!date &&
                                      !dateError &&
                                      examInputs[exam.code]?.gradeTouched;

                                    setExamInputs((prev) => ({
                                      ...prev,
                                      [exam.code]: {
                                        ...prev[exam.code],
                                        gradeTouched: true,
                                        gradeError,
                                        isComplete,
                                      },
                                    }));
                                  }}>
                                  <InputOTPGroup>
                                    <InputOTPSlot
                                      index={0}
                                      hasError={
                                        examInputs[exam.code]?.gradeTouched &&
                                        !!examInputs[exam.code]?.gradeError
                                      }
                                    />
                                  </InputOTPGroup>
                                </InputOTP>
                              </div>
                              {examInputs[exam.code]?.gradeTouched &&
                                examInputs[exam.code]?.gradeError && (
                                  <div className="flex items-center gap-1 text-xs text-red-500 mt-1 col-start-1 col-span-5">
                                    <CircleAlert size={14} />
                                    <p>{examInputs[exam.code]?.gradeError}</p>
                                  </div>
                                )}
                            </div>
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
