import Card from "@/components/card/card";
import ExamCard from "@/components/card/exam-card";
import CardCarousel from "@/components/card/card-carousel";
import LiuImg from "@/assets/liu.png";
import { PillButton, PillbuttonContainer } from "@/components/main/pillbutton";
import React, { useState } from "react";

export default function Page() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold">Min utbildning.</h1>
        <div className="flex items-center">
          <img src={LiuImg.src} alt="" className="h-[4.25rem]" />
          <div className="ml-4">
            <p className="text-sm font-semibold text-gray-600">300hp</p>
            <h2 className="text-2xl font-semibold">Civilingenjörsprogram i medieteknik.</h2>
          </div>
        </div>
      </header>
      <main className="w-full mt-4">
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Kurser</h2>
          <PillbuttonContainer />
        </section>
      </main>

      <section>
        <h2 className="text-2xl font-semibold">Meritvärde</h2>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Högskolepoäng</h2>
      </section>
    </>
  );
}
