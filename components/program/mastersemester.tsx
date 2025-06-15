"use client";
import { useState } from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import { StatusSquare } from "../edit/statussquare";
import { CourseJSON, Status, UserData } from "@/utils/types";
import { SemesterInfo } from "@/utils/semesterDates";
import { Courses } from "./courses";

interface MasterSemesterInterface {
  name: string;
  courses: CourseJSON[];
}

interface EditMasterSemesterProps {
  semester: {
    fullString: string;
    semester: "HT" | "VT";
    year: number;
  };
  index: number;
}

type StatusBorderClasses = Record<Status, string>;

export default function MasterSemester({
  semester,
  semesterSeason,
  userData,
  subjectfilter,
}: {
  semester: MasterSemesterInterface;
  semesterSeason: SemesterInfo;
  userData: UserData | undefined;
  subjectfilter: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const status = checkStatus(semester, semesterSeason, userData);

  const totalCredits = semester.courses.reduce((sum, course) => {
    return sum + Number(course.credits.replace("hp", "").trim());
  }, 0);

  const borderClasses: StatusBorderClasses = {
    none: "",
    ongoing: "border-1 border-yellow-900",
    done: "border-1 border-green-900",
    error: "",
    added: "",
    deleted: "",
    changed: "",
  };

  return (
    <div>
      <main className=" bg-accent overflow-hidden rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
        <button className="flex items-center justify-between w-full p-4 cursor-pointer hover:bg-highlight-2" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex gap-4 items-center">
            <StatusSquare status={status} />
            <h3 className="text-lg font-medium">{subjectfilter ? semester.name : semester.name.slice(0, -7)}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-29">
              {!subjectfilter && <p className=" text-sm text-gray-600 w-22 text-center ">{semesterSeason.fullString}</p>}
              <div className="w-17.5 h-1"></div>
              <p className=" text-sm text-gray-600 w-13 text-right">{totalCredits}</p>
            </div>

            <ChevronDown size={24} className={`col-start-8 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
          </div>
        </button>
        <section>
          {isOpen && (
            <div className="bg-accent px-4 pb-4">
              {semester.courses.map((course) => (
                <Courses key={course.course_code} course={course} semesterStatus={status} semesterSeason={semesterSeason} userData={userData} subjectfilter={subjectfilter} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function checkStatus(semester: MasterSemesterInterface, semesterSeason: SemesterInfo, userData?: UserData): Status {
  if (semesterSeason.year > new Date().getFullYear()) {
    return "none";
  }

  if (semesterSeason.year === new Date().getFullYear() && new Date().getMonth() < 9 && semesterSeason.semester === "HT") {
    return "none";
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const isCurrentSemester =
    semesterSeason.year === currentYear && ((semesterSeason.semester === "VT" && currentMonth >= 1 && currentMonth <= 6) || (semesterSeason.semester === "HT" && currentMonth >= 8));

  let hasIncompleteCourses = false;
  let hasCompletedCourses = false;

  for (const course of semester.courses) {
    if (Number(course.credits.replace("hp", "").trim()) === 0) {
      continue;
    }

    const courseInfo = userData?.studyinfo.get(course.course_code);
    const hasGrade = courseInfo?.grade && courseInfo.grade !== "";
    const hasDate = courseInfo?.date;

    if (hasGrade && hasDate) {
      hasCompletedCourses = true;
    } else {
      hasIncompleteCourses = true;
    }
  }

  // Determine status
  if (hasCompletedCourses && !hasIncompleteCourses) {
    return "done";
  }
  if (hasCompletedCourses && hasIncompleteCourses) {
    return "ongoing";
  }
  if (isCurrentSemester) {
    return "ongoing";
  }
  return "none";
}
