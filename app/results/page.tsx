"use client";

import { UploadPDFInput } from "@/components/form/uploadpdf";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChangeHistory } from "@/components/edit/changehistory";
import { Checkbox } from "@/components/ui/checkbox";

// Funktionerna för att generera och hämta terminer som inte mappas från json
import { generateAllSemesters, getSemestersInRange } from "@/utils/semesterDates";
import EditMasterSemester from "@/components/edit/EditMasterSemester";
import EditSemesters from "@/components/edit/EditSemesters";

import programData from "@/webscraping/6CEMEN-2022.json";
import thesisData from "@/webscraping/Exjobb-engineers.json";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";

export default function Page() {
  // Här får vi setta en variabel på startterminen som användaren valde. Hårdkodad för nu.
  const startingSemester = "HT 2022";
  const showFrom = 7;
  const showTo = 9;
  const allSemesters = useMemo(() => generateAllSemesters(startingSemester), [startingSemester]);
  const masterSemesters = useMemo(() => getSemestersInRange(startingSemester, showFrom, showTo), [startingSemester, showFrom, showTo]);
  const finalThesisSemester = useMemo(() => allSemesters[9], [allSemesters]);

  const program = programData.programs[0];

  const thsesis = {
    ...thesisData.programs[0],
    semesters: thesisData.programs[0].semesters.map((semester) => ({
      ...semester,
      name: `Termin 10 ${finalThesisSemester.fullString}`,
    })),
  };

  const currentYear = new Date().getMonth() < 8 ? new Date().getFullYear() - 1 : new Date().getFullYear();
  const startYear = currentYear - 8;

  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold mt-2">Redigera kurser och moment.</h1>
      </header>
      <main className="w-full h-[28.25rem] grid grid-cols-5 gap-4 mt-6">
        <section className="col-start-1 col-span-3 w-full">
          <div className="flex flex-col flex-1 gap-4 w-full">
            <div className="flex flex-col gap-1">
              <label className="flex text-xs font-light">
                Universitet/högskola <p className="text-red-900">*</p>
              </label>
              <Select>
                <SelectTrigger className="w-full bg-accent cursor-pointer">
                  <SelectValue placeholder="Välj"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Universitet</SelectLabel>*/}
                    <SelectItem value="Linköpings universitet">Linköpings universitet</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full gap-4">
              <div className="flex flex-col w-3/4 gap-1">
                <label className="flex text-xs font-light">
                  Program/utbildning <p className="text-red-900">*</p>
                </label>
                <Select>
                  <SelectTrigger className="w-full bg-accent cursor-pointer">
                    <SelectValue placeholder="Välj"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Program/utbildning</SelectLabel>*/}

                      <SelectItem value="Civilingenjörsprogram i medieteknik">Civilingenjörsprogram i medieteknik</SelectItem>
                      <SelectItem value="Civilingenjörsprogram i elektronikdesign" disabled>
                        Civilingenjörsprogram i elektronikdesign
                      </SelectItem>
                      <SelectItem value="Civilingenjörsprogram i kommunikation, transport och samhälle" disabled>
                        Civilingenjörsprogram i kommunikation, transport och samhälle
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col w-1/4 gap-1">
                <label className="flex text-xs font-light">
                  Antagningstillfälle <p className="text-red-900">*</p>
                </label>
                <Select name="studyYear" required>
                  <SelectTrigger className="w-full text-foreground bg-accent cursor-pointer">
                    <SelectValue placeholder="Välj" className="text-foreground"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Antagningstillfälle</SelectLabel>*/}

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
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox id="terms1" className="bg-accent" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Jag sökte CSN för första gången i samband med denna utbildning.
                </label>
              </div>
            </div>

            <Separator />
            <div className="flex flex-col gap-4">
              {program.semesters.map((semester) => (
                <EditSemesters key={semester.name} semester={semester} />
              ))}
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              {masterSemesters.map((semester, index) => (
                <EditMasterSemester key={semester.fullString} semester={semester} index={index + showFrom - 1} />
              ))}
            </div>
            <Separator />
            <div className="flex flex-col gap-4 pb-4">
              {thsesis.semesters.map((semester) => (
                <EditSemesters key={semester.name} semester={semester} />
              ))}
            </div>
          </div>
        </section>
        <section className="col-start-4 col-span-2">
          <div className="sticky top-[4.688rem] flex flex-col w-full max-h-[88.5vh] gap-4">
            <div>
              <UploadPDFInput />
            </div>
            <div className="">
              <ChangeHistory />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
