"use client";

import { UploadPDFInput } from "@/components/form/uploadpdf";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChangeHistory } from "@/components/edit/changehistory";
import { Checkbox } from "@/components/ui/checkbox";

// Funktionerna för att generera och hämta terminer som inte mappas från json
import { generateAllSemesters, getSemestersInRange } from "@/utils/semesterDates";
import EditMasterSemester from "@/components/edit/EditMasterSemester";
import EditSemesters from "@/components/edit/EditSemesters";

import programData from "@/webscraping/6CEMEN-2022.json";
import thesisData from "@/webscraping/Exjobb-engineers.json";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { GetUserData } from "./actions";

type studyInformation = {
  year: string | undefined;
  program: string | undefined;
  university: string | undefined;
  previousFounds: boolean;
}

export default function Page() {
  const [studyInformation, setStudyInformation] = useState<studyInformation>({ year: undefined, program: undefined, university: undefined, previousFounds: false, })

  const currentYear = new Date().getMonth() < 8 ? new Date().getFullYear() - 1 : new Date().getFullYear();
  const startYear = currentYear - 4;

  const startingSemester = studyInformation.year ? `HT ${studyInformation.year}` : `HT ${currentYear}`;

  const showFrom = 7;
  const showTo = 9;
  const allSemesters = generateAllSemesters(startingSemester);
  const masterSemesters = getSemestersInRange(startingSemester, showFrom, showTo);
  const finalThesisSemester = allSemesters[9];

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
  useEffect(() => {
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
  }, []);

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
              <Select onValueChange={(value) => setStudyInformation({ ...studyInformation, university: value })} required value={studyInformation.university}>
                <SelectTrigger className="w-full bg-accent cursor-pointer" value={studyInformation.university}>
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
                <Select onValueChange={(value) => setStudyInformation({ ...studyInformation, program: value })} required value={studyInformation.program}>
                  <SelectTrigger className="w-full bg-accent cursor-pointer" value={studyInformation.program}>
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
                <Select name="studyYear" required onValueChange={(value) => setStudyInformation({ ...studyInformation, year: value })} value={studyInformation.year}>
                  <SelectTrigger className="w-full text-foreground bg-accent cursor-pointer" value={studyInformation.year}>
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
              <Checkbox id="terms1" className="!bg-foreground/20 aspect-square size-5" onClick={() => setStudyInformation({ ...studyInformation, previousFounds: !studyInformation.previousFounds })} checked={studyInformation.previousFounds} />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Jag har tidigare sökt CSN
                </label>
              </div>
            </div>

            <Separator />
            {studyInformation.year !== undefined ? (
              <>
                <div className="flex flex-col gap-4">
                  {program.semesters.map((semester) => {
                    semesterCount += 1;
                    return <EditSemesters key={semester.name} semester={semester} semsterSeason={allSemesters[semesterCount]} />;
                  })}
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
                    <EditSemesters key={semester.name} semester={semester} semsterSeason={allSemesters[9]} />
                  ))}
                </div>
              </>
            ) : (
              <p>Välj ett studieår</p>
            )}
          </div>
        </section>
        <section className="col-start-4 col-span-2">
          <div className="sticky top-[4.688rem] flex flex-col w-full max-h-[88.5vh] gap-4">
            {studyInformation.year !== undefined ? (
              <>
                <div>
                  <UploadPDFInput />
                </div>
                <div>
                  <ChangeHistory studyProgram={studyInformation.program} studyYear={studyInformation.year} studyUniversity={studyInformation.university} previousFounds={studyInformation.previousFounds} />
                </div>
              </>
            ) : (
              <>
                <p>Inget studieår valt</p>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
