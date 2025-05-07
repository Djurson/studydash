

import * as React from "react";
import CardProgress from "@/components/card/card-progress";
import { Examination, WithAuthProps } from "@/utils/types";
import { withAuth } from "@/serverhooks/withAuth";


function calculateHpPerAcademicYear(map: Map<number, Examination[]>) {
  const totals = new Map<string, number>();

  for (const [key, exams] of map.entries()) {
    const year = Math.floor(key / 100);
    const month = key % 100;

    const academicYear = month >= 8 ? `${year}-${year + 1}` : `${year - 1}-${year}`;

    const totalHp = exams.reduce((sum: number, exam) => sum + (Number(exam.hp) || 0), 0);

    totals.set(academicYear, (totals.get(academicYear) || 0) + totalHp);
  }

  return totals;
}

async function Page({ userData}: Partial<WithAuthProps>) {

  return (
    <>
      <header>
        <div className="ml-4 ">
          <h1 className="text-3xl font-semibold">Mitt studiemedel</h1>
        </div>
      </header>
      <main className="w-full h-[35rem] grid grid-cols-1 grid-rows-5 mt-4 gap-4">
        {(() => {
          const totals = calculateHpPerAcademicYear(userData?.sortedDateMap ?? new Map());
          const startYear = Number(userData?.studyyear);
          const cards = [];

          for (let i = 0; i < 5; i++) {
            const academicYear = `${startYear + i}-${startYear + i + 1}`;
            const hp = totals.get(academicYear) || 0;

            cards.push(
              <CardProgress
                key={academicYear}
                year={(i + 1).toString()}
                startyear={startYear + i}
                hp={hp}
              />
            );
          }

          return cards;
        })()}
      </main>
      <section className="h-[20rem] pt-4">
        <div className="h-full flex-col items-between">
          <h1 className="h-auto text-xl font-semibold pb-2">Krav för studiemedel</h1>
          <p className="pb-2">Under de första 40 veckorna med studiestöd måste du klara 62,5 procent av högskole­poängen (hp). Det innebär att om du har fått studiestöd för 40 veckor (60 hp) så är kravet att du måste klara 37 hp.</p>
          <p className="">Efter de 40 första veckorna med studie­stöd ökar kravet på studie­resultat. Kravet är då 75 procent. Det innebär att om du fått studie­stöd på heltid för 40 veckor (60 hp) så är kravet att du måste ha klarat 45 hp. Om du studerar på deltid får du behålla det lägre kravet på studieresultat (62,5 procent) under fler veckor.</p>
        </div>
      </section>
    </>
  );
}

export default withAuth(Page);
