"use server";
import Card from "@/components/card/card";
import React from "react";
import { PencilLine } from "lucide-react";

// import exjobbData from "@/webscraping/Exjobb-engineers.json";
import { ProgressCard } from "@/components/program/progressCard";
import { WithAuthProps } from "@/utils/types";
import { withAuth } from "@/serverhooks/withAuth";
import { Credits } from "@/components/charts/credits";
import { MeritPoints } from "@/components/charts/meritpoints";
import { MeritPointsBarChart } from "@/components/charts/meripointsbarchart";

import { ScrollHandler } from "@/components/navigation/scrollhandler";
import CourseClientWrapper from "@/components/program/clientWrapper";
import userProgram from "@/components/utils/userProgram";

// interface exjobbData {
//   programs: Program[];
// }

async function Page({ userData }: Partial<WithAuthProps>) {
  const program = userProgram(userData);

  return (
    <>
      <ScrollHandler />

      <header>
        <h1 className="text-3xl font-semibold">Min utbildning.</h1>
      </header>
      <section id="progress">
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
          <CourseClientWrapper userData={userData} />
        </section>
      </main>

      <section id="merit">
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
      <section id="credits">
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
