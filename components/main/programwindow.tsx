"use client";
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

interface Course {}

interface ProgramData {
  programs: Program[];
}

interface exjobbData {
  programs: Program[];
}

export default function ProgramWindow({ currentTerm }: any) {
  const program = programData.programs[0];
  const exjobb = exjobbData.programs[0];

  var coursesArray: any = [];

  program.semesters.forEach((semester) => {
    if (semester.name.includes(currentTerm)) {
      semester.courses.forEach((courses) => {
        coursesArray.push({ courses, semester });
      });
    }
  });

  return (
    <div className="flex flex-col gap-4 mt-2 overflow-y-auto h-[24.25rem]">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-gray-600">Nuvarande</h3>
        <hr className="w-full bg-gray-600"></hr>
        {coursesArray.map((item: any, index: any) => (
          <a
            className="flex flex-col gap-2"
            key={index}
            href={`/program#${encodeURIComponent(item.semester.name)}`}
            onClick={() => {
              // Small delay to ensure the hash change is processed
              setTimeout(() => {
                const element = document.getElementById(
                  encodeURIComponent(item.semester.name)
                );
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                  });
                }
              }, 100);
            }}
          >
            <h3 className="text-sm font-semibold">{item.courses.name}</h3>
            <div className="flex flex-row justify-between w-full">
              <p className="text-xs text-gray-600">
                {item.courses.course_code}
              </p>
              <p className="text-xs text-gray-600">{item.courses.credits}</p>
            </div>
            <hr className="w-full bg-gray-600"></hr>
          </a>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-600 text-sm">Ej avklarade</h3>
        <hr className="w-full bg-gray-600"></hr>
        {coursesArray.map((item: any, index: any) => (
          <a
            className="flex flex-col gap-2"
            key={index}
            href={`/program#${encodeURIComponent(item.semester.name)}`}
            onClick={() => {
              // Small delay to ensure the hash change is processed
              setTimeout(() => {
                const element = document.getElementById(
                  encodeURIComponent(item.semester.name)
                );
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                  });
                }
              }, 100);
            }}
          >
            <h3 className="text-sm font-semibold">{item.courses.name}</h3>
            <p className="text-xs text-gray-600">{item.courses.course_code}</p>
            <div className="flex flex-row justify-between w-full">
              {item.courses.examinations.map((exam: any) => (
                <p className="text-xs text-gray-600">{exam.name}</p>
              ))}
              <p className="text-xs text-gray-600">{item.courses.credits}</p>
            </div>
            <hr className="w-full bg-gray-600"></hr>
          </a>
        ))}
      </div>
    </div>
  );
}
