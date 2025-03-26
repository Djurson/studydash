import Card from "@/components/card/card";
import ExamCard from "@/components/card/exam-card";
import CardCarousel from "@/components/card/card-carousel";
import LiuImg from "@/assets/liu.png";
import PillButton from "@/components/main/pillbutton";
import React, { useState } from "react";

export default function Page() {
  /*const [selected, setSelected] = useState("");*/

  return (
    <>
      <header className="flex items-center">
        <img src={LiuImg.src} alt="" className="h-[5.5rem]" />
        <div className="ml-4">
          <p className="text-xl font-semibold text-gray-600">300hp</p>
          <h1 className="text-3xl font-semibold">
            Civilingenjörsprogram i medieteknik.
          </h1>
        </div>
      </header>
      <main className="w-full h-[28.25rem] grid grid-cols-5 grid-rows-2 gap-4 mt-8 ">
        <div className="row-span-2 col-span-2">
          <Card cardTitle="Intjänade högskolepoäng"></Card>
        </div>
        <Card cardTitle="Studiemedelskrav"></Card>
        <Card cardTitle="Medelmerit"></Card>
        <div className="row-span-2 ">
          <Card cardTitle="Mina kurser"></Card>
        </div>
        <div className="col-span-2 ">
          <Card cardTitle="Mina studieframsteg"></Card>
        </div>
      </main>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Kommande tentor för dig</h2>
        <div className="flex">
          {/*<PillButton id={""} label={"test"} value={""} currentValue={""} />*/}
        </div>

        <CardCarousel />
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Dina prestationer</h2>
      </section>
    </>
  );
}
