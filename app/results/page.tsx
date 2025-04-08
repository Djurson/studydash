"use client";

import { UploadPDFInput } from "@/components/form/uploadpdf";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeHistory } from "@/components/edit/changehistory";

// Funktionerna för att generera och hämta terminer som inte mappas från json
import {
  generateAllSemesters,
  getSemestersInRange,
} from "@/utils/semesterDates";
import EditMasterSemester from "@/components/edit/EditMasterSemester";
import EditSemesters from "@/components/edit/EditSemesters";

import programData from "@/webscraping/6CEMEN-2022.json";
import { useState } from "react";
import { Course } from "@/utils/types";

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

interface Examination { }

interface ProgramData {
  programs: Program[];
}

interface exjobbData {
  programs: Program[];
}

export default function Page() {
  const [courseResults, setCourseResults] = useState<Course[]>();
  // Här får vi setta en variabel på startterminen som användaren valde. Hårdkodad för nu.
  const startingSemester = "HT 2022";
  const showFrom = 7;
  const showTo = 9;
  const allSemesters = generateAllSemesters(startingSemester);
  const masterSemesters = getSemestersInRange(
    startingSemester,
    showFrom,
    showTo
  );

  const program = programData.programs[0];


  const currentYear = new Date().getMonth() < 8 ? new Date().getFullYear() - 1 : new Date().getFullYear();
  const startYear = currentYear - 8;

  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold mt-2">
          Redigera kurser och moment.
        </h1>
      </header>
      <main className="w-full h-[28.25rem] grid grid-cols-5 gap-4 mt-6">
        <section className="col-start-1 col-span-3">
          <div className="flex flex-col flex-1 gap-4">
            <Select disabled>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Linköpings universitet"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Universitet</SelectLabel>
                  <SelectItem value="Linköpings universitet">
                    Linköpings universitet
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex w-full gap-4">
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Civilingenjör i medieteknik"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Program/utbildning</SelectLabel>
                    <SelectItem value="Civilingenjör i medieteknik">
                      Civilingenjör i medieteknik
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select name="studyYear" required>
                <SelectTrigger className="w-full text-gray-900 bg-white-0">
                  <SelectValue placeholder="När påbörjade du dina studier?" className="text-gray-900"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>När påbörjade du dina studier?</SelectLabel>
                    {Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
                      const year = startYear + index;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          HT {year}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select name="prev-funds" required>
                <SelectTrigger className="w-full text-gray-900 bg-white-0">
                  <SelectValue placeholder="Har du sökt CSN tidigare?" className="text-gray-900"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Har du sökt CSN tidigare?</SelectLabel>
                    <SelectItem value={"yes"}>Ja</SelectItem>
                    <SelectItem value={"no"}>Nej</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              {program.semesters.map((semester) => (
                <EditSemesters key={semester.name} semester={semester} courseResults={courseResults} setCourseResults={setCourseResults} />
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {masterSemesters.map((semester, index) => (
                <EditMasterSemester
                  key={semester.fullString}
                  semester={semester}
                  index={index + showFrom - 1}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="col-start-4 col-span-2 ">
          <div className="sticky top-[4.688rem] flex flex-col w-full h-[88.5vh] gap-4">
            <div>
              <UploadPDFInput courseResults={courseResults} setCourseResults={setCourseResults} />
            </div>

            <div>
              <ChangeHistory />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
