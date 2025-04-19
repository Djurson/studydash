import Card from "@/components/card/card";
import ExamCard from "@/components/card/exam-card";
import CardCarousel from "@/components/card/card-carousel";
import LiuImg from "@/assets/liu.png";
import { PillButton, PillbuttonContainer } from "@/components/main/pillbutton";
import React, { useState } from "react";
import { PencilLine } from "lucide-react";
import SemesterAccordion from "@/components/accordions/SemesterAccordion";
import { GetStaticProps } from "next";

import programData from "@/webscraping/6CEMEN-2022.json";
import exjobbData from "@/webscraping/Exjobb-engineers.json";
import { ChartLanding } from "@/components/chartLanding";

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

interface Examination { }

interface ProgramData {
  programs: Program[];
}

interface exjobbData {
  programs: Program[];
}

export default function Page() {
  const program = programData.programs[0];
  const exjobb = exjobbData.programs[0];

  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold">Min utbildning.</h1>
      </header>
      <section className="grid grid-cols-5 grid-rows-1 gap-4 mt-6">
        <div className="col-span-4">
          <Card variant="no-header" cardTitle="">
            <div className="flex items-center">
              <img src={LiuImg.src} alt="" className="h-[4.25rem] dark:grayscale-100 dark:invert" />
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600">300hp</p>
                <h2 className="text-2xl font-semibold">
                  Civilingenjörsprogram i medieteknik.
                </h2>
              </div>
            </div>
            <div className="bg-blue-200 h-4 w-full mt-4"></div>
            <p>progress bar</p>
          </Card>
        </div>
        <a
          href="/results"
          className="bg-accent rounded-2xl border-1 border-blue-900 shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full p-4 col-span-1 flex flex-col items-center">
          <div className="bg-blue-100 h-[4rem] flex items-center justify-center aspect-square rounded-2xl">
            <PencilLine color="#0071E3" size={34} />
          </div>
          <span className="text-sm text-center mt-4">
            <span className="text-blue-900">Redigera</span> kurser eller moment.
          </span>
        </a>
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

      <section>
        <h2 className="text-2xl font-semibold mt-8">Meritvärde</h2>
        <div className="mt-4 w-full">
  <Card cardTitle="">
    <div style={{ width: "100%", height: 300 }}>
      <ChartLanding height={300} width="100%" showStats={false} />
    </div>
  </Card>
</div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mt-8">Högskolepoäng</h2>
        <div className="mt-4 w-full h-50">
          <Card cardTitle=""></Card>
        </div>
      </section>
    </>
  );
}
