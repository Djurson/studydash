import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown } from "lucide-react";
import EditCourses from "./EditCourses";
import { Course, CourseJSON } from "@/utils/types";
import { EditCourse } from "./editcourse";

interface Semester {
  name: string;
  courses: CourseJSON[];
}

export default function SemesterAccordion({ semester }: { semester: Semester; }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="p-4 bg-white rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
      <button
        className="grid grid-cols-8 grid-rows-1 items-center w-full"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="col-start-1 col-span-4 flex gap-4 items-center">
          <div className="border-1 border-gray-900 rounded-sm h-[1.188rem] aspect-square"></div>
          <h3 className="text-lg font-medium">{semester.name.slice(0, -7)}</h3>
        </div>

        <p className="col-start-5 col-span-2 text-xs text-gray-600 text-left ">
          {semester.name.slice(-7)}
        </p>

        <ChevronDown
          size={24}
          className={`col-start-8 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        />
      </button>
      <section>
        {isOpen && (
          <div className=" bg-white mt-4">
            {semester.courses.map((course) => (
              <EditCourse key={course.course_code} course={course} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
