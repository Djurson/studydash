import { ChevronDown } from "lucide-react";
import { Course, CourseJSON } from "@/utils/types";
import { EditCourse } from "./editcourse";
import { Status, StatusSquare } from "./statussquare";
import { useStudyResultsListener } from "@/hooks/editcontext";
import { useEffect, useState, memo } from "react";

interface Semester {
  name: string;
  courses: CourseJSON[];
}

function SemesterAccordion({ semester }: { semester: Semester }) {
  const [isOpen, setIsOpen] = useState(false);
  const { getCourse } = useStudyResultsListener();

  // Beräkna status direkt utan att använda en separat state
  const status = CheckStatus(semester, getCourse);

  return (
    <main className=" bg-accent overflow-hidden rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
      <button className="flex items-center justify-between w-full p-4 cursor-pointer hover:bg-highlight-2" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex gap-4 items-center">
          <StatusSquare status={status} />
          <h3 className="text-lg font-medium">{semester.name.slice(0, -7)}</h3>
        </div>
        <div className="flex items-center gap-2">
          <p className=" text-xs text-gray-600 text-left ">{semester.name.slice(-7)}</p>
          <ChevronDown size={24} className={`col-start-8 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
      </button>
      <section>
        {isOpen && (
          <div className="bg-accent px-4 pb-4">
            {semester.courses.map((course) => (
              <EditCourse key={course.course_code} course={course} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function CheckStatus(semester: Semester, getCourse: (courseCode: string) => Course | undefined): Status {
  for (let i = 0; i < semester.courses.length; i++) {
    const courseResults = getCourse(semester.courses[i].course_code);

    if (!courseResults || !courseResults.grade || courseResults.grade === "") {
      return "ongoing";
    }
  }
  return "done";
}

export default memo(SemesterAccordion);
