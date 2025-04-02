"use client";
import { Hedvig_Letters_Sans } from "next/font/google";
import { useState } from "react";
import Header from "../supabase-template/hero";
import { ChevronDown } from "lucide-react";
import CourseAccordion from "@/components/accordions/CourseAccordion";

interface Semester {
  name: string;
  courses: Course[];
}

interface Course {
  name: string;
  course_code: string;
  credits: string;
  VOF: string;
}

export default function SemesterAccordion({
  semester,
}: {
  semester: Semester;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="p-4 bg-white rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
      <button
        className="flex justify-between items-center w-full"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex gap-4 items-center">
          <div className="border-1 border-gray-900 rounded-sm h-[1.188rem] aspect-square"></div>
          <h3 className="text-xl font-medium">{semester.name.slice(0, -7)}</h3>
        </div>

        <p className="text-xs text-gray-600">{semester.name.slice(-7)}</p>

        <p className="text-xs text-gray-600">0/30 hp</p>

        <ChevronDown
          size={24}
          className={`transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <section>
        {isOpen && (
          <div className="p-4 bg-white">
            {semester.courses.map((course) => (
              <CourseAccordion key={course.course_code} course={course} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
