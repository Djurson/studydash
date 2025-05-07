import { ChevronDown } from "lucide-react";
import { Course, CourseJSON, UserData } from "@/utils/types";
import { Courses } from "./courses";
import { Status, StatusSquare } from "../edit/statussquare";
import { useState } from "react";
import { SemesterInfo } from "@/utils/semesterDates";

interface Semester {
  name: string;
  courses: CourseJSON[];
}

export default function SemesterAccordion({ semester, semsterSeason, userData }: { semester: Semester; semsterSeason: SemesterInfo; userData: UserData | undefined }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className=" bg-accent overflow-hidden rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
      <button className="flex items-center justify-between w-full p-4 cursor-pointer hover:bg-highlight-2" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex gap-4 items-center">
          <StatusSquare status={"done"} />
          <h3 className="text-lg font-medium">{semester.name.slice(0, -7)}</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-29">
            <p className=" text-sm text-gray-600 w-22 text-center ">{semsterSeason.fullString}</p>
            <div className="w-17.5 h-1"></div>
            <p className=" text-sm text-gray-600 w-13 text-right "> 30 hp</p>
          </div>

          <ChevronDown size={24} className={`col-start-8 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
      </button>
      <section>
        {isOpen && (
          <div className="bg-accent px-4 pb-4">
            {semester.courses.map((course) => (
              <Courses key={course.course_code} course={course} semesterStatus={"done"} semesterSeason={semsterSeason} userData={userData} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
