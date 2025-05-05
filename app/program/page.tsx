import Card from "@/components/card/card";
import { PillbuttonContainer } from "@/components/main/pillbutton";
import React from "react";
import { PencilLine } from "lucide-react";
import SemesterAccordion from "@/components/accordions/SemesterAccordion";

import programData from "@/webscraping/6CEMEN-2022.json";
import exjobbData from "@/webscraping/Exjobb-engineers.json";
import { ProgressCard } from "@/components/program/progressCard";
import { Program, WithAuthProps } from "@/utils/types";
import { withAuth } from "@/serverhooks/withAuth";
import { Credits } from "@/components/charts/credits";
import { MeritPoints } from "@/components/charts/meritpoints";
import { MeritPointsBarChart } from "@/components/charts/meripointsbarchart";

import { ScrollHandler } from "@/components/navigation/scrollhandler";

interface exjobbData {
  programs: Program[];
}

async function Page({ userData }: Partial<WithAuthProps>) {
  const program = programData.programs[0];
  const exjobb = exjobbData.programs[0];

  return (
    <>
      <ScrollHandler />

      <header>
        <h1 className="text-3xl font-semibold">Min utbildning.</h1>
      </header>
      <section id="progress" className="scroll-mt-[6rem]">
        <div className="grid grid-cols-5 grid-rows-1 gap-4 mt-6 ">
          <div className="col-span-4">
            <Card variant="no-header" cardTitle="">
              <ProgressCard userData={userData} credits={program.credits} url={program.url} />
            </Card>
          </div>
          <a href="/results" className="bg-accent rounded-2xl border-1 border-blue-900 shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full p-4 col-span-1 flex flex-col items-center">
            <div className="bg-blue-100 h-[4rem] flex items-center justify-center aspect-square rounded-2xl">
              <PencilLine color="#0071E3" size={34} />
            </div>
            <span className="text-sm text-center mt-4">
              <span className="text-blue-900">Redigera</span> kurser eller moment.
            </span>
          </a>
        </div>
      </section>
      <main className="w-full mt-4">
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Kurser</h2>
          <PillbuttonContainer />
          <div className="flex flex-col gap-4 mt-4">
            <div>
              <p>Kandidat</p>
              <div className="mt-2 flex flex-col gap-4">
                {program.semesters.map((semester) => (
                  <SemesterAccordion key={semester.name} semester={semester} />
                ))}
              </div>
            </div>

            <div>
              <p className="">Master</p>
              <div className="mt-2 flex flex-col gap-4">
                {/*
                //  måste ändra här sen för år och termin 
                    inte generellt för alla terminer just nu då den läser det från Exjobb-engineers.json
                    så göra en varient för denna sista termin där man kanske räknar ut året och terminen på nått sett
                */}
                {exjobb.semesters.map((semester) => (
                  <SemesterAccordion key={semester.name} semester={semester} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <section id="merit" className="scroll-mt-[6rem]">
        <h2 className="text-2xl font-semibold mt-8">Meritvärde</h2>
        <div className="mt-4 w-full overflow-hidden h-full">
          <Card cardTitle="" variant="no-header">
            <div className="flex gap-8 h-full overflow-hidden">
              <div className="w-1/4">
                <header className="flex flex-col gap-2">
                  <h3 className="text-xl">Genomsnittsmerit</h3>
                  <p className="text-sm text-muted-foreground"> Visar data från {userData?.studyyear} - nu</p>
                </header>
                <div className="h-fit translate-y-10 w-full">
                  <MeritPoints userData={userData} />
                </div>
              </div>
              <div className="w-3/4">
                <header>
                  <h3 className="text-xl">Intjänade betyg</h3>
                </header>
                <MeritPointsBarChart userData={userData} />
              </div>
            </div>
          </Card>
        </div>
      </section>
      <section id="credits" className="scroll-mt-[6rem]">
        <h2 className="text-2xl font-semibold mt-8">Högskolepoäng</h2>
        <div className="mt-4 w-full">
          <Card cardTitle="" variant="no-header">
            <Credits userData={userData} />
          </Card>
        </div>
      </section>
    </>
  );
}

export default withAuth(Page);
