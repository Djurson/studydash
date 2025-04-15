"use client"
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

export default function ProgramWindow({
  currentTerm
}: any) {

  const program = programData.programs[0];
  const exjobb = exjobbData.programs[0];

  var coursesArray: any = [];

  program.semesters.forEach((semester) => {
    if (semester.name.includes(currentTerm)) {
      semester.courses.forEach((courses) => {
        coursesArray.push({courses, semester})
      })
    }
  })

  return (
    <div className="flex flex-col gap-2 mt-2">
      {coursesArray.map((item:any, index:any) => (
        <a 
          key={index} 
          href={`/program#${encodeURIComponent(item.semester.name)}`}
          onClick={() => {
            // Small delay to ensure the hash change is processed
            setTimeout(() => {
              const element = document.getElementById(encodeURIComponent(item.semester.name));
              if (element) {
                element.scrollIntoView({behavior: 'smooth', block: 'end',  inline: "nearest"});
              }
            }, 100);
          }}
        >
          <p>{item.courses.name}</p>
        </a>
      ))}
    </div>
  );
}