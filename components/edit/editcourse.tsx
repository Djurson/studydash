"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Separator } from "../ui/separator";
import { Course, CourseJSON } from "@/utils/types";
import { Status, StatusSquare } from "./statussquare";
import { useStudyResultsListener } from "@/hooks/editcontext";
import { CourseExaminationMapping } from "./editexam";

export function EditCourse({ course, semesterStatus }: { course: CourseJSON; semesterStatus: Status }) {
  const [isOpen, setIsOpen] = useState(false);
  const { getCourse } = useStudyResultsListener();
  const [grade, setGrade] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<Status>(semesterStatus);

  let courseResults: Course | undefined = undefined;

  // Om kursen är inom "studieåret"/har varit hämtar vi endast information kring kursen
  // Går på termin statusen
  if (semesterStatus !== "none") {
    courseResults = getCourse(course.course_code);
  }

  const { returnGrade, returnStatus } = CheckGradeAndStatus(courseResults, semesterStatus);

  useEffect(() => {
    setStatus(returnStatus);
    if (returnGrade === undefined) {
      setGrade(undefined);
      return;
    }
    setGrade(returnGrade.toString());
  }, [returnGrade, returnStatus]);
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
                    <CourseExaminationMapping key={exam.code} exam={exam} course={course} semesterStatus={semesterStatus} />
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

function CheckGradeAndStatus(resultsCourse: Course | undefined, semesterStatus: Status): { returnGrade: string | number | undefined; returnStatus: Status } {
  if (!resultsCourse) {
    return {
      returnGrade: undefined,
      returnStatus: semesterStatus,
    };
  }

  if (resultsCourse.grade === "" || resultsCourse.date === "") {
    return {
      returnGrade: undefined,
      returnStatus: "ongoing",
    };
  }

  return {
    returnGrade: resultsCourse.grade,
    returnStatus: "done",
  };
}
