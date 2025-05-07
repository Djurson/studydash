import { Course, CourseJSON, Examination, ExaminationJSON, UserData } from "@/utils/types";

import { Status, StatusSquare } from "../edit/statussquare";

//import { useStudyResults } from "@/hooks/editcontext";
import { SemesterInfo } from "@/utils/semesterDates";

export function Exams({ semesterStatus, course, exam, userData }: { exam: ExaminationJSON; course: CourseJSON; semesterStatus: Status; semesterSeason: SemesterInfo; userData: UserData | undefined }) {
  const grade = userData?.studyinfo.get(course.course_code)?.examinations.get(exam.code)?.grade;
  const date = userData?.studyinfo.get(course.course_code)?.examinations.get(exam.code)?.date;

  const formatDate = (dateStr?: string): string | undefined => {
    if (!dateStr || dateStr.length !== 8) return undefined;
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
  };

  const formattedDate = formatDate(date);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex relative w-full">
          <div className="absolute left-[0.469rem] top-0 bottom-0 w-px bg-secondary z-0" />
          <div className="flex flex-col pl-[1.125rem] w-full">
            <div className="w-full">
              <div className="flex py-2 justify-between">
                <div className="flex gap-4">
                  <div className=" flex items-center">
                    <StatusSquare status={grade && date ? "done" : semesterStatus} />
                  </div>
                  <p className="text-sm font-normal max-w-150">
                    {exam.name} - {exam.code}
                  </p>
                </div>

                <div className="flex gap-30 items-center">
                  <p className="text-gray-600 self-center text-sm font-light text-right ">{formattedDate}</p>

                  <p className="text-gray-600 self-center text-sm font-light w-17.5 text-center">{grade}</p>

                  <p className="text-gray-600 self-center text-sm font-light w-13 text-right">{exam.credits}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
