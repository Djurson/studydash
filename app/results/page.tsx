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
import { useEffect, useRef, useState } from "react";
import { GetUserData } from "./actions";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

type studyInformation = {
  year: string | undefined;
  program: string | undefined;
  university: string | undefined;
  previousFounds: boolean;
};

export default function Page() {
  const plugin = useRef(Autoplay({ delay: 26000, stopOnInteraction: true, stopOnLastSnap: true }));
  const [studyInformation, setStudyInformation] = useState<studyInformation>({
    year: undefined,
    program: undefined,
    university: undefined,
    previousFounds: false,
  });

  const [openGuide, setOpenGuide] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
        setOpenGuide(false);
      } else {
        setOpenGuide(true);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div aria-label="Loading..." role="status" className="flex items-center justify-center h-[80dvh] w-full">
        <div className="border-gray-600 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-900" />
      </div>
    );
  }

  return (
    <>
      <AlertDialog open={openGuide}>
        <AlertDialogContent variant="wider">
          <AlertDialogHeader className="w-full">
            <AlertDialogTitle className="w-full">Ny användare?</AlertDialogTitle>
            <AlertDialogDescription className="w-full">Här kommer en snabb guide över hur du kan enkelt ladda upp dina studieresultat:</AlertDialogDescription>
            <Carousel plugins={[plugin.current]} onClick={plugin.current.stop}>
              <CarouselContent className="w-[42dvw]">
                <CarouselItem>
                  <video src="/videos/animated-guide.webm" autoPlay loop muted playsInline></video>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex flex-col items-center justify-center">
                    <img src="/imgs/Website Link Comp.png" alt="student.ladok.se" />
                    <div className="w-4/5 justify-center items-center flex flex-col gap-3 bg-accent px-4 py-2 rounded-md">
                      <p className="text-sm flex gap-1 items-center justify-start font-medium text-left">
                        1. Navigera till
                        <Link href={"https://www.student.ladok.se/"} target="_blank" className="underline flex items-center justify-center gap-1">
                          student.ladok.se/
                          <SquareArrowOutUpRight className="size-2" />
                        </Link>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex flex-col items-center justify-center">
                    <img src="/imgs/Website Layout Comp.png" alt="hemsida design" />
                    <div className="w-4/5 justify-center items-center flex flex-col gap-3 bg-accent px-4 py-2 rounded-md">
                      <p className="text-sm flex gap-1 items-center justify-start font-medium text-left">2. Öppna sidmenyn och tryck på &quot;intyg&quot;</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex flex-col items-center justify-center">
                    <img src="/imgs/Create Cert Button Comp.png" alt="skapa intyg knapp" />
                    <div className="w-4/5 justify-center items-center flex flex-col gap-3 bg-accent px-4 py-2 rounded-md">
                      <p className="text-sm flex gap-1 items-center justify-start font-medium text-left">3. Tryck på skapa intyg</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex flex-col items-center justify-center">
                    <img src="/imgs/Type Cert Dropdown Comp.png" alt="typ av intyg knapp" />
                    <div className="w-4/5 justify-center items-center flex flex-col gap-3 bg-accent px-4 py-2 rounded-md">
                      <p className="text-sm flex gap-1 items-center justify-start font-medium text-left">4. Välj &quot;resultatintyg&quot;</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex flex-col items-center justify-center">
                    <img src="/imgs/Type Cert Comp.png" alt="avgränsa" />
                    <div className="w-4/5 justify-center items-center flex flex-col gap-3 bg-accent px-4 py-2 rounded-md">
                      <p className="text-sm flex gap-1 items-center justify-start font-medium text-left">5. Välj &quot;Alla avslutade kurser&quot;</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex flex-col items-center justify-center">
                    <img src="/imgs/Modules Comp.png" alt="moduler" />
                    <div className="w-4/5 justify-center items-center flex flex-col gap-3 bg-accent px-4 py-2 rounded-md">
                      <p className="text-sm flex gap-1 items-center justify-start font-medium text-left">6. Välj:</p>
                      <p className="text-xs flex gap-1 items-center justify-start font-medium text-left">&quot;Godkända moduler i ej avslutade kurser&quot;</p>
                      <p className="text-xs flex gap-1 items-center justify-start font-medium text-left">&quot;Godkända moduler i avslutade kurser&quot;</p>
                      <p className="text-xs flex gap-1 items-center justify-start font-medium text-left">&quot;Koder&quot;</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex flex-col items-center justify-center">
                    <img src="/imgs/Lang Comp.png" alt="språk" />
                    <div className="w-4/5 justify-center items-center flex flex-col gap-3 bg-accent px-4 py-2 rounded-md">
                      <p className="text-sm flex gap-1 items-center justify-start font-medium text-left">7. Välj &quot;Svenska&quot;</p>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselNext variant={"default"} />
              <CarouselPrevious variant={"default"} />
            </Carousel>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenGuide(false)}>Stäng guide</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
              <Checkbox
                id="terms1"
                className="!bg-foreground/20 aspect-square size-5"
                onClick={() => setStudyInformation({ ...studyInformation, previousFounds: !studyInformation.previousFounds })}
                checked={studyInformation.previousFounds}
              />
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
                  <UploadPDFInput setOpenGuide={setOpenGuide} />
                </div>
                <div>
                  <ChangeHistory
                    studyProgram={studyInformation.program}
                    studyYear={studyInformation.year}
                    studyUniversity={studyInformation.university}
                    previousFounds={studyInformation.previousFounds}
                  />
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
