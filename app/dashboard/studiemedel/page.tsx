"use client"

import * as React from "react"
import CardProgress from "@/components/card/card-progress"

// Properly format the data for Recharts

export default function Page() {
  return (
    <>
      <header>
        <div className="ml-4 ">
          <h1 className="text-3xl font-semibold">Mitt studiemedel</h1>
        </div>
      </header>
      <main className="w-full h-[35rem] grid grid-cols-1 grid-rows-5 mt-4 gap-4">
          <CardProgress year="1" startyear={2022} hp={27}></CardProgress>
          <CardProgress year="2" startyear={2023} hp={22.5}></CardProgress>
          <CardProgress year="3" startyear={2024} hp={60}></CardProgress>
          <CardProgress year="4" startyear={2025} hp={60}></CardProgress>
          <CardProgress year="5" startyear={2026} hp={60}></CardProgress>
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