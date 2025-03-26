import Card from "@/components/card/card";
import ExamCard from "@/components/card/exam-card";
import CardCarousel from "@/components/card/card-carousel";
import LiuImg from "@/assets/liu.png";
import { PillButton, PillbuttonContainer } from "@/components/main/pillbutton";
import React, { useState } from "react";

export default function Page() {
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
      <main className="w-full mt-8 ">
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Kurser</h2>
          <PillbuttonContainer />
        </section>
      </main>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold">Meritvärde</h2>
      </section>
      <section className="mt-4">
        <h2 className="text-2xl font-semibold">Högskolepoäng</h2>
      </section>
    </>
  );
}
