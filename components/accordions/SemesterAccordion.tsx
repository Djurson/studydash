"use client";

import { useState, useEffect } from "react";

import { ChevronDown } from "lucide-react";
import CourseAccordion from "@/components/accordions/CourseAccordion";

type Semester = {
  name: string;
  courses: Course[];
};

type Course = {
  name: string;
  course_code: string;
  credits: string;
  VOF: string;
  examinations: Examination[];
};

type Examination = {
  code: string;
  name: string;
  credits: string;
  grading: string;
};

export default function SemesterAccordion({ semester }: { semester: Semester }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.substring(1); // Remove the # character
      if (hash === encodeURIComponent(semester.name)) {
        setIsOpen(true);
      }
    };

    // Check on mount
    checkHash();

    // Add event listener for hash changes
    window.addEventListener('hashchange', checkHash);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', checkHash);
    };
  }, [semester.name]);

  return (
    <main id={`${encodeURIComponent(semester.name)}`} className="p-4 bg-accent rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
      <button className="grid grid-cols-10 grid-rows-1 items-center w-full" onClick={() => setIsOpen(!isOpen)}>
        <div className="col-start-1 col-span-5 flex gap-4 items-center">
          <div className="border-1 border-secondary rounded-sm h-[1.188rem] aspect-square"></div>
          <h3 className="text-xl font-medium">{semester.name.slice(0, -7)}</h3>
        </div>

        <p className="col-start-6 col-span-2 text-xs text-gray-600 text-left ">{semester.name.slice(-7)}</p>

        <p className="col-start-8 col-span-1 text-xs text-gray-600 text-left ">0/30 hp</p>

        <ChevronDown size={24} className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out stroke-foreground ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>
      <section>
        {isOpen && (
          <div className=" bg-accent mt-4">
            {semester.courses.map((course) => (
              <CourseAccordion key={course.course_code} course={course} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
