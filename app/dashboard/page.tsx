import Card from "@/components/card/card";
import ExamCard from "@/components/card/exam-card";
import CardCarousel from "@/components/card/card-carousel";
import LiuImg from "@/assets/liu.png";
import { PillButton, PillbuttonContainer } from "@/components/main/pillbutton";
import React, { useState } from "react";
import ProgramWindow from "@/components/main/programwindow";

export default function Page() {
  return (
    <>
      <header className="flex items-center">
        <img src={LiuImg.src} alt="" className="h-[5.5rem] dark:grayscale-100 dark:invert" />
        <div className="ml-4">
          <p className="text-xl font-semibold text-muted">300hp</p>
          <h1 className="text-3xl font-semibold">Civilingenjörsprogram i medieteknik.</h1>
        </div>
      </header>
      <main className="w-full h-[28.25rem] grid grid-cols-5 grid-rows-2 gap-4 mt-4 ">
        <div className="row-span-2 col-span-2">
          <Card variant="header" cardTitle="Intjänade högskolepoäng"></Card>
        </div>
        <Card variant="header" cardTitle="Studiemedelskrav"></Card>
        <Card variant="header" cardTitle="Medelmerit"></Card>
        <div className="row-span-2 ">
          <Card variant="header" cardTitle="Mina kurser">
            <ProgramWindow currentTerm="Termin 2 VT 2023"></ProgramWindow>
          </Card>
        </div>
        <div className="col-span-2 ">
          <Card variant="header" cardTitle="Mina studieframsteg"></Card>
        </div>
      </main>
      <section className="mt-4">
        <h2 className="text-2xl font-semibold">Kommande tentor för dig</h2>
        <PillbuttonContainer />

        <CardCarousel />
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Dina prestationer</h2>
      </section>
    </>
  );
}
