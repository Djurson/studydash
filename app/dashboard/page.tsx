"use server";

import Card from "@/components/card/card";
import LiuImg from "@/assets/liu.png";
import { StudyFunds } from "@/components/charts/studyfunds";
import { MeritPoints } from "@/components/charts/meritpoints";
import { Credits } from "@/components/charts/credits";
import { StudyProgress } from "@/components/charts/studyprogress";
import { withAuth } from "@/serverhooks/withAuth";
import { WithAuthProps } from "@/utils/types";
import { Suspense } from "react";
import CardLoading from "@/components/card/card-loading";
import CreditsLoading from "@/components/charts/credits-loading";
import CardForExams from "@/components/card/cardforexams";
import programData from "@/webscraping/6CEMEN-2022.json";
import ProgramWindow from "@/components/main/programwindow";

async function Page({ user, userData }: WithAuthProps) {
  const program = programData.programs[0];
  return (
    <>
      <header className="flex items-center">
        <img src={LiuImg.src} alt="" className="h-[5.5rem] dark:grayscale-100 dark:invert" />
        <div className="ml-4">
          <p className="text-xl font-semibold text-muted">{program.credits}</p>
          <h1 className="text-3xl font-semibold">{userData?.program}.</h1>
        </div>
      </header>
      <main className="w-full h-[28.25rem] grid grid-cols-5 grid-rows-2 gap-4 mt-4 ">
        <div className="row-span-2 col-span-2">
          <Suspense fallback={<CardLoading />}>
            <Card variant="header" cardTitle="Intjänade högskolepoäng" href="/program" sectionId="credits">
              <Suspense fallback={<CreditsLoading />}>
                <Credits userData={userData} />
              </Suspense>
            </Card>
          </Suspense>
        </div>
        <Suspense fallback={<CardLoading />}>
          <Card variant="header" cardTitle="Studiemedelskrav">
            <StudyFunds userData={userData} />
          </Card>
        </Suspense>
        <Suspense fallback={<CardLoading />}>
          <Card variant="header" cardTitle="Medelmerit" href="/program" sectionId="merit">
            <MeritPoints userData={userData} />
          </Card>
        </Suspense>

        <div className="row-span-2 ">
          <Suspense fallback={<CardLoading />}>
            <Card variant="header" cardTitle="Mina kurser">
              <ProgramWindow userData={userData}></ProgramWindow>
            </Card>
          </Suspense>
        </div>
        <div className="col-span-2 ">
          <Suspense fallback={<CardLoading />}>
            <Card variant="header" cardTitle="Mina studieframsteg" href="/program" sectionId="progress">
              <StudyProgress userData={userData} />
            </Card>
          </Suspense>
        </div>
      </main>
      <section className="mt-4">
        <h2 className="text-2xl font-semibold">Kommande tentor för dig</h2>
        <CardForExams userData={userData} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Dina prestationer</h2>
      </section>
    </>
  );
}

export default withAuth(Page);
