import { Course, CourseJSON, Examination, ExaminationJSON } from "@/utils/types";
import { CreateCourse, CreateExamination, UpdateExamResult, ValidateDate, ValidateGrade } from "@/utils/utils";
import { getTodayFormatted } from "@/utils/validateDateGrade";
import { useEffect, useState } from "react";
import { Status, StatusSquare } from "./statussquare";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
import { AlertCircle } from "lucide-react";
import { useStudyResults } from "@/hooks/editcontext";

type ExamError = {
  dateError: string | null;
  gradeError: string | null;
  dateFakeError: string | null;
};

export function CourseExaminationMapping({ exam, course, semesterStatus }: { exam: ExaminationJSON; course: CourseJSON; semesterStatus: Status }) {
  const [errors, setErrors] = useState<ExamError>({
    dateError: null,
    gradeError: null,
    dateFakeError: null,
  });
  const { setCourse, hasExamination, hasCourse, getExamination, getCourse, setExamination, updateExamResult } = useStudyResults();

  let currentCourseResults: Course | undefined = undefined;

  if (semesterStatus !== "none") {
    currentCourseResults = getCourse(course.course_code);
  }
  // Om användaren öppnar drawer:n så skapas examinationsmomentet i studyresults (om det inte finns redan)
  useEffect(() => {
    if (!hasCourse(course.course_code)) {
      const tempCourse: Course = CreateCourse(course.name, course.course_code, Number.parseFloat(course.credits.replace("hp", "").replace(",", ".").trim()));
      setCourse(course.course_code, tempCourse);
    }

    if (!hasExamination(course.course_code, exam.code)) {
      const tempExamination: Examination = CreateExamination(exam.name, exam.code, Number.parseFloat(exam.credits.replace("hp", "").replace(",", ".").trim()));
      setExamination(course.course_code, exam.code, tempExamination);
    }
  }, []);

  // Använd useCallback för att memoizera funktionerna
  const HandleDateChange = (value: string) => {
    if (semesterStatus === "none") {
      return;
    }
    setErrors({
      ...errors,
      dateError: null,
      dateFakeError: null,
    });
    const error = ValidateDate(value, "20220801", getTodayFormatted());
    if (error && value.length === 8) {
      setErrors({
        ...errors,
        dateError: error,
        dateFakeError: null,
      });
      const dateUpdate: Partial<Examination> = { date: "" };
      updateExamResult(course, exam, dateUpdate);
      return;
    } else if (error && value.length < 8) {
      setErrors({
        ...errors,
        dateFakeError: error,
      });
    }
    const dateUpdate: Partial<Examination> = { date: value };
    updateExamResult(course, exam, dateUpdate);
    const { finalGrade, finalDate } = CalculateFinalGradeAndDate(course, exam, getExamination, getExamination(course.course_code, exam.code)?.grade, value);

    if (!finalGrade || !finalDate || !currentCourseResults) {
      return;
    }

    currentCourseResults["date"] = finalDate;
    currentCourseResults["grade"] = finalGrade;
  };

  const HandleGradeChange = (value: string) => {
    if (semesterStatus === "none") {
      return;
    }
    setErrors({
      ...errors,
      gradeError: null,
    });
    const error = ValidateGrade(value, exam);
    if (error || value === "") {
      const gradeUpdate: Partial<Examination> = { grade: "" };
      updateExamResult(course, exam, gradeUpdate);
      setErrors({
        ...errors,
        gradeError: error,
      });
      return;
    }

    let examgrade: string | number;
    if (value === "G" || value === "D") examgrade = value;
    else if (!isNaN(Number(value))) examgrade = Number.parseFloat(value);
    else examgrade = "";
    const gradeUpdate: Partial<Examination> = { grade: examgrade };

    updateExamResult(course, exam, gradeUpdate);
    const { finalGrade, finalDate } = CalculateFinalGradeAndDate(course, exam, getExamination, examgrade, getExamination(course.course_code, exam.code)?.date);

    if (!finalGrade || !finalDate || !currentCourseResults) {
      return;
    }

    currentCourseResults["date"] = finalDate;
    currentCourseResults["grade"] = finalGrade;
  };

  const status: Status =
    errors.gradeError || errors.dateError || errors.dateFakeError
      ? "error"
      : getExamination(course.course_code, exam.code)?.grade.toString()?.length === 1 && getExamination(course.course_code, exam.code)?.date?.length === 8
      ? "done"
      : semesterStatus;

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex relative w-full">
          <div className="absolute left-[0.469rem] top-0 bottom-0 w-px bg-secondary z-0" />
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
                    <InputOTP maxLength={8} onChange={HandleDateChange} value={getExamination(course.course_code, exam.code)?.date} error={errors.dateError ?? null}>
                      <InputOTPGroup className={`${errors.dateError ? "animate-shake-forwards" : ""}`}>
                        <InputOTPSlot index={0} placeholder="Y" hasError={!!errors.dateError} />
                        <InputOTPSlot index={1} placeholder="Y" hasError={!!errors.dateError} />
                        <InputOTPSlot index={2} placeholder="Y" hasError={!!errors.dateError} />
                        <InputOTPSlot index={3} placeholder="Y" hasError={!!errors.dateError} />
                      </InputOTPGroup>
                      <InputOTPSeparator className={`${errors.dateError ? "animate-shake-forwards" : ""}`} />
                      <InputOTPGroup className={`${errors.dateError ? "animate-shake-forwards" : ""}`}>
                        <InputOTPSlot index={4} placeholder="M" hasError={!!errors.dateError} />
                        <InputOTPSlot index={5} placeholder="M" hasError={!!errors.dateError} />
                      </InputOTPGroup>
                      <InputOTPSeparator className={`${errors.dateError ? "animate-shake-forwards" : ""}`} />
                      <InputOTPGroup className={`${errors.dateError ? "animate-shake-forwards" : ""}`}>
                        <InputOTPSlot index={6} placeholder="D" hasError={!!errors.dateError} />
                        <InputOTPSlot index={7} placeholder="D" hasError={!!errors.dateError} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {errors.dateError && (
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} color="#f36961" />
                      <p className="text-red-900">{errors.dateError}</p>
                    </div>
                  )}
                  {!errors.dateError && errors.dateFakeError && (
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} color="#f36961" />
                      <p className="text-red-900">{errors.dateFakeError}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 items-end justify-start text-sm">
                  <div className="flex gap-2 items-center justify-start text-sm">
                    <p>Betyg:</p>
                    <InputOTP maxLength={1} onChange={HandleGradeChange} value={getExamination(course.course_code, exam.code)?.grade.toString() ?? undefined} error={errors.gradeError ?? null}>
                      <InputOTPGroup className={`${errors.gradeError ? "animate-shake-forwards" : ""}`}>
                        <InputOTPSlot index={0} placeholder="x" defaultValue="" hasError={!!errors.gradeError} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {errors.gradeError && (
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} color="#f36961" />
                      <p className="text-red-900">{errors.gradeError}</p>
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

function CalculateFinalGradeAndDate(
  courseJSON: CourseJSON,
  examJSON: ExaminationJSON,
  getExamination: (courseCode: string, examCode: string) => Examination | undefined,
  inputExamGrade: string | number | undefined,
  inputExamDate: string | undefined
): { finalGrade: string | number | undefined; finalDate: string | undefined } {
  // Om den aktuella examinationen saknar betyg eller datum, returnera undefined
  if (!inputExamGrade || !inputExamDate) {
    return {
      finalDate: undefined,
      finalGrade: undefined,
    };
  }

  let latestDate = 0;
  let numericGrades: number[] = [];
  let numericExams = 0;
  let allPassedGrade = true;
  let onlyGPassedExams = true;

  // Gå igenom alla examinationer
  for (let i = 0; i < courseJSON.examinations.length; i++) {
    const currentExam = courseJSON.examinations[i];

    // Hoppa över examinationer som inte ger poäng
    if (currentExam.credits.replace("hp", "").trim() === "0") {
      continue;
    }

    // Hämta examinationsresultatet
    let examRes = getExamination(courseJSON.course_code, currentExam.code);

    // Om examinationen inte finns, returnera undefined
    if (!examRes) {
      return {
        finalDate: undefined,
        finalGrade: undefined,
      };
    }

    // Om det är den aktuella examinationen som håller på att uppdateras
    if (examRes.code === examJSON.code) {
      examRes = {
        ...examRes,
        grade: examRes.grade !== "" ? examRes.grade : inputExamGrade,
        date: examRes.date !== "" ? examRes.date : inputExamDate,
      };
    }

    // Om examinationen saknar betyg eller datum, returnera undefined
    if (examRes.grade === "" || examRes.date === "") {
      return {
        finalDate: undefined,
        finalGrade: undefined,
      };
    }

    // Uppdatera senaste datum
    latestDate = Math.max(latestDate, parseInt(examRes.date));

    // Hantera olika typer av betyg
    if (typeof examRes.grade === "string") {
      if (examRes.grade === "G") {
        // Detta är ett G-betyg, inget problem
        continue;
      } else if (examRes.grade === "U") {
        // Om någon examination är underkänd, så är hela kursen underkänd
        allPassedGrade = false;
        return {
          finalDate: undefined,
          finalGrade: undefined,
        };
      } else {
        // Om det är ett annat strängbetyg än G eller U
        onlyGPassedExams = false;
      }
    } else if (typeof examRes.grade === "number") {
      // Det finns minst ett numeriskt betyg
      onlyGPassedExams = false;

      if (examRes.grade < 3) {
        // Om någon examination är underkänd, så är hela kursen underkänd
        allPassedGrade = false;
        return {
          finalDate: undefined,
          finalGrade: undefined,
        };
      }

      // Lägg till betyget för medelvärdesberäkning
      numericGrades.push(examRes.grade);
      numericExams++;
    }
  }

  // Om alla examinationer är godkända
  if (allPassedGrade) {
    // Om alla godkända examinationer har G-betyg, returnera G
    if (onlyGPassedExams || numericGrades.length === 0) {
      return {
        finalDate: latestDate.toString(),
        finalGrade: "G",
      };
    }

    // Annars beräkna medelvärdet av de numeriska betygen
    const averageGrade = Math.round(numericGrades.reduce((sum, grade) => sum + grade, 0) / numericExams);

    return {
      finalDate: latestDate.toString(),
      finalGrade: averageGrade,
    };
  }

  // Om vi kommer hit så är något fel
  return {
    finalDate: undefined,
    finalGrade: undefined,
  };
}
