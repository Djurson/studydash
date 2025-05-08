"use client";

import { UploadPDFInput } from "@/components/form/uploadpdf";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChangeHistory } from "@/components/edit/changehistory";
import { Checkbox } from "@/components/ui/checkbox";

// Funktionerna för att generera och hämta terminer som inte mappas från json
import { generateAllSemesters, getSemestersInRange } from "@/utils/semesterDates";
import EditMasterSemester from "@/components/edit/EditMasterSemester";
import Semester from "@/components/program/semester";

import programData from "@/webscraping/6CEMEN-2022.json";
import thesisData from "@/webscraping/Exjobb-engineers.json";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CourseJSON, Examination, ExaminationJSON, UserData } from "@/utils/types";
import MasterSemester from "./mastersemester";
import { MapHasExamination } from "@/utils/utils";
//import { GetUserData } from "./actions";

type studyInformation = {
  year: string | undefined;
  program: string | undefined;
  university: string | undefined;
  previousFounds: boolean;
};


export default function SemesterSection({ userData, mainSubjects, setSelected = "Alla" }: { userData: UserData | undefined; mainSubjects: Map<string, CourseJSON[]>; setSelected?: string}) {
  const [studyInformation, setStudyInformation] = useState<studyInformation>({
    year: undefined,
    program: undefined,
    university: undefined,
    previousFounds: false,
  });

  const currentYear = new Date().getMonth() < 8 ? new Date().getFullYear() - 1 : new Date().getFullYear();
  const startYear = userData?.studyyear;

  const startingSemester = startYear ? `HT ${startYear}` : `HT ${currentYear}`;
  const showFrom = 7;
  const showTo = 9;
  const allSemesters = generateAllSemesters(startingSemester);
  const masterSemesters = getSemestersInRange(startingSemester, showFrom, showTo);
  const finalThesisSemester = allSemesters[9];
  const pillbutton = false;

  let semesterCount = -1;
  const program = programData.programs[0];

  const thsesis = {
    ...thesisData.programs[0],
    semesters: thesisData.programs[0].semesters.map((semester) => ({
      ...semester,
      name: `Termin 10 ${finalThesisSemester.fullString}`,
    })),
  };

  // Hämta data från servern
  /*  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await GetUserData();
      if (userData) {
        setStudyInformation({
          year: userData.studyyear,
          program: userData.program,
          university: userData.university,
          previousFounds: userData.previousfunds,
        });
      }
    };

    fetchUserData();
  }, []); */

  console.log("userData", userData);


  const getFilteredContent = () => {
    if (!userData?.sortedDateMap) {
      return { useProgram: true, filteredSubjects: new Map() };
    }
  
    const filteredMap = new Map<string, CourseJSON[]>();

    console.log(userData.sortedDateMap)
  
   /* userData.sortedDateMap.forEach((courses, semester) => {
      let filteredCourses: Examination[] = [];
  
  if (setSelected === "Avklarade") {
        filteredCourses = courses.filter(course => MapHasExamination(userData, course.code));
      } else if (setSelected === "Oavklarade") {
        filteredCourses = courses.filter(course => !MapHasExamination(userData, course.code));
      } else {
        // Default: include all courses
        filteredCourses = courses;
      }
  
      if (filteredCourses.length > 0) {
        filteredMap.set(semester, filteredCourses);
      }
    });
  
    return { useProgram: false, filteredSubjects: filteredMap };*/
  };


  return (
    <>
      <main className="flex flex-col gap-4 mt-4">
        <section>
          <Separator />

          <div className="flex flex-col gap-4 mt-4">
            {pillbutton
              ? program.semesters.map((semester) => {
                  semesterCount += 1
                  return <Semester key={semester.name} semester={semester} semsterSeason={allSemesters[semesterCount]} userData={userData} subjectfilter={false} />;
                })
              : Array.from(mainSubjects.keys()).map((subject: string) => {
                semesterCount+=1;
                  return (
                    <Semester
                      key={subject}
                      semester={{ name: subject, courses: mainSubjects.get(subject) ?? [] }}
                      semsterSeason={allSemesters[semesterCount]}
                      userData={userData}
                      subjectfilter={true}
                    />
                  );
                })}
          </div>
        </section>

        <Separator />
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {masterSemesters.map((semester, index) => (
              <MasterSemester key={semester.fullString} semester={semester} index={index + showFrom - 1} />
            ))}
          </div>

          <div className="flex flex-col gap-4 pb-4">
            {thsesis.semesters.map((semester) => (
              <Semester key={semester.name} semester={semester} semsterSeason={allSemesters[9]} userData={userData} subjectfilter={false} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
