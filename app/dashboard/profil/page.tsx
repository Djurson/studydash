import { ThemeSwitcher } from "@/components/supabase-template/theme-switcher";
import React, { useState } from "react";
import { Button }from "@/components/ui/button"
import Card from "@/components/card/card";
import {SquareUserRound, ChartNoAxesCombined, FileUser, Download} from "lucide-react";
import { PillButton_prest } from "@/components/main/pillbutton_prestationer";
import CardCarousel from "@/components/card/card-carousel";
import AchievementGrid from "./achievments";
import { AchievementsCard } from "@/components/card/achievments-card";

export default function Page() {
  return (
    <>
      <header className="flex items-center">
        <div className="ml-4">
          <h1 className="text-3xl font-semibold">
            Profil
          </h1>
        </div>
      </header>
      <main className="w-full h-[20rem] grid grid-cols-3 grid-rows-1 gap-4 mt-4 pb-[4rem]">
        <div className="row-span-1 col-span-1">
          <div className="flex items-center space-x-1">
            <SquareUserRound color="black" size={34} />
            <h2 className="text-base">Användare</h2>
          </div>
          <Card variant="no-header" cardTitle="">
            < div className="w-full flex flex-col gap-7 px-4 py-4">
              <div className="flex justify-between">
                <span className="text-black font-semibold">E-postadress</span>
                <span className="text-gray-500">example@student.se</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black font-semibold">Namn</span>
                <span className="text-gray-500">John Doe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black font-semibold">Årskurs</span>
                <span className="text-gray-500">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black font-semibold">Program</span>
                <span className="text-gray-500">Civilingenjör i medieteknik</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="row-span-1 col-span-1">
          <div className="flex items-center space-x-1">
            <ChartNoAxesCombined color="black" size={34} />
            <h2>Statistik</h2>
          </div>
          <Card variant="no-header" cardTitle="">
            <div className="w-full flex flex-col gap-7 px-4 py-4">
              <div className="flex justify-between">
                <span className="text-black font-semibold">Intjänade högskolpoäng</span>
                <span className="text-gray-500">-200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black font-semibold">Avklarade kurser</span>
                <span className="text-gray-500">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black font-semibold">Snittbetyg</span>
                <span className="text-gray-500">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black font-semibold">Högskolepoäng till examen</span>
                <span className="text-gray-500">350</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="row-span-1 col-span-1">
          <div className="flex items-center space-x-1">
            <FileUser color="black" size={34} />
            <h2>Användardata</h2>
          </div>
          <Card variant="no-header" cardTitle="">
            <div className="grid grid-cols-1 grid-row2 mt-[2rem]">
              <div className="flex items-center justify-center">
                <p>Här kan du ladda ner din användardata som en PDF!</p>
              </div>
              <div className="flex mt-[4rem]">
                <Button size="lg" className="bg-green-900 w-full h-[5rem]" >
                  <Download color="white" size={200}></Download>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <section className="w-full h-[40rem] grid grid-cols-3 grid-rows-2 pb-[8rem]" >
        <div className="row-span-2  col-span-3">
          <section className="mt-4">
            <h2 className="text-2xl font-semibold">Prestationer</h2>
            <PillButton_prest />
          </section>
          <AchievementsCard cardTitle="">
            <AchievementGrid/>
          </AchievementsCard>
        </div>
      </section>
      <section className="w-[20rem] h-[15rem]">
        <div className="row-span-1 col-span1">
          <Card variant="no-header" cardTitle="">
            <div className="w-full flex items-center justify-between">
              <div className="bg-gray-200 rounded-2xl m-[1rem] p-[1rem]">
                <p>Logga ut</p>
              </div>
              <div className="bg-red-900 rounded-2xl p-[1rem]">
                <p>Ta bort konto</p>
              </div>
            </div>
          </Card>
        </div>
      </section>    
    </>
  );
}
