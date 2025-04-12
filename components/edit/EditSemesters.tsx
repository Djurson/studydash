import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CourseJSON } from "@/utils/types";
import { EditCourse } from "./editcourse";

interface Semester {
  name: string;
  courses: CourseJSON[];
}

export default function SemesterAccordion({ semester }: { semester: Semester }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className=" bg-accent overflow-hidden rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
      <button className="flex items-center justify-between w-full p-4 cursor-pointer hover:bg-highlight-2" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex gap-4 items-center">
          <div className="border-1 border-foreground rounded-sm h-[1.188rem] aspect-square"></div>
          <h3 className="text-lg font-medium">{semester.name.slice(0, -7)}</h3>
        </div>
        <div className="flex items-center gap-2">
          <p className=" text-xs text-gray-600 text-left ">{semester.name.slice(-7)}</p>
          <ChevronDown size={24} className={`col-start-8 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
      </button>
      <section>
        {isOpen && (
          <div className=" bg-accent px-4 pb-4">
            {semester.courses.map((course) => (
              <EditCourse key={course.course_code} course={course} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
