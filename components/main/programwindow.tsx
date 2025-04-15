"use client"
import SemesterAccordion from "@/components/accordions/SemesterAccordion";

import programData from "@/webscraping/6CEMEN-2022.json";
import exjobbData from "@/webscraping/Exjobb-engineers.json";

interface Program {
    name: string;
    credits: string;
    url: string;
    semesters: Semester[];
  }

  interface Semester {
    name: string;
    courses: Course[];
  }

  interface Course { }

  
  interface ProgramData {
    programs: Program[];
  }
  
  interface exjobbData {
    programs: Program[];
  }

export default function ProgramWindow() {

    const program = programData.programs[0];
    const exjobb = exjobbData.programs[0];

    return (
        <>
            <div className="flex flex-col gap-2 mt-2">
                {program.semesters.map((semester) => (
                    semester.courses.forEach((name) => (
                        
                    ))
                ))}

            </div>
        </>
    )
}