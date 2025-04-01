"use client";
import { Hedvig_Letters_Sans } from "next/font/google";
import { useState } from "react";
import Header from "../supabase-template/hero";
import { ChevronDown } from "lucide-react";
import CourseAccordion from "@/components/accordions/CourseAccordion";

interface Semester {
  name: string;
}

export default function SemesterAccordion({
  semester,
}: {
  semester: Semester;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="p-4 bg-white rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
      <button className="flex" onClick={() => setIsOpen(!isOpen)}>
        <div className="border-1 border-gray-900 rounded-s-sm"></div>
        <h3>{semester.name}</h3>
        <p>HT 2022</p>
        <p>0/30 hp</p>
        {isOpen ? (
          <ChevronDown size={24} rotate={180} />
        ) : (
          <ChevronDown size={24} />
        )}
      </button>
      <section></section>
    </main>
  );
}
