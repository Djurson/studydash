"use client";
import { Hedvig_Letters_Sans } from "next/font/google";
import { useState } from "react";
import Header from "../supabase-template/hero";
import { ChevronDown, CirclePlus } from "lucide-react";

import CourseAccordion from "@/components/accordions/CourseAccordion";
import { Separator } from "../ui/separator";

interface EditMasterSemesterProps {
  semester: {
    fullString: string;
    semester: "HT" | "VT";
    year: number;
  };
  index: number;
}

export default function EditMasterSemester({ semester, index }: EditMasterSemesterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="p-4 bg-accent rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
      <button className="grid grid-cols-8 grid-rows-1 items-center w-full" onClick={() => setIsOpen(!isOpen)}>
        <div className="col-start-1 col-span-4 flex gap-4 items-center">
          <div className="border-1 border-foreground rounded-sm h-[1.188rem] aspect-square"></div>
          <h3 className="text-lg font-medium">Termin {index + 1}</h3>
        </div>

        <p className="col-start-5 col-span-2 text-xs text-gray-600 text-left ">{semester.fullString.slice(-7)}</p>

        <ChevronDown size={24} className={`col-start-8 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>
      <section>
        {isOpen && (
          <div className="mt-4 flex items-center pl-4 py-2 gap-2 cursor-pointer hover:underline">
            <CirclePlus size={18} />
            <p className="text-sm">Lägg till en masterkurs</p>
          </div>
        )}
      </section>
    </main>
  );
}
