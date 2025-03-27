import Card from "@/components/card/card";
import ExamCard from "@/components/card/exam-card";
import CardCarousel from "@/components/card/card-carousel";
import LiuImg from "@/assets/liu.png";
import { PillButton, PillbuttonContainer } from "@/components/main/pillbutton";
import React, { useState } from "react";
import { PencilLine } from "lucide-react";

export default function Page() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold">Min utbildning.</h1>
      </header>
      <section className="grid grid-cols-5 grid-rows-1 gap-4 mt-6">
        <div className="col-span-4">
          <Card variant="no-header" cardTitle="">
            <div className="flex items-center">
              <img src={LiuImg.src} alt="" className="h-[4.25rem]" />
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
          className="bg-white rounded-2xl border-1 border-blue-900 shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full p-4 col-span-1 flex flex-col items-center">
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
