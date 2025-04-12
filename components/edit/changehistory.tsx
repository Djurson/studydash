"use client";

import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { CircleOff } from "lucide-react";
import { useStudyResults } from "@/hooks/editcontext";
import { Course } from "@/utils/types";
import { StatusChangeHistory } from "./statuschangehistory";

export function ChangeHistory() {
  const { studyResults } = useStudyResults();

  return (
    <main className="flex flex-col bg-accent rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full max-h-[66.1vh]">
      <header className="p-4 flex gap-4 items-center justify-center">
        <div className="text-center bg-blue-200 dark:bg-highlight w-6 aspect-square rounded-md">
          <p>{studyResults.current.size}</p>
        </div>
        <p className="text-center bg-blue-200 dark:bg-highlight px-1 py-1 rounded-md">{studyResults.current.size}</p>
        <p className="text-lg">Ändringar gjorda</p>
      </header>
      <Separator className="bg-secondary" />
      <section className="px-4 overflow-auto">
        {/*Mapa ändringar nedan, tänker formatet: /Termin/Kursnamn... */}
        {/* Kommer ej kunna lösa termin, men kurskod/Kursnamn osv går :) */}
        {/* Examinations moment kommer också vara för "dyrt" att loopa igenom för att displaya alla dem så tänker 
            om kurser innehåller ett betyg -> done, om den inte innehåller ett betyg -> eventuellt loopa igenom examinationsmoment
            hoppa över de som är oklarade */}
        <div className="py-2.5 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Checkbox className="h-[1.188rem] w-[1.188rem]"></Checkbox>
            <p className="text-sm">Termin/Kursnamn...</p>
          </div>
          <StatusChangeHistory status="added" defaultStatus="none" className="ml-6" />
        </div>
        <Separator />
      </section>
      <Separator />
      <footer className="flex flex-col p-4 gap-4">
        <div className="flex flex-col gap-2">
          {/*Denna div ska dyka upp om ändringar gjorts*/}
          <div className="flex justify-between text-xs ">
            <p className="text-gray-600">Tillagt:</p>
            <p className="text-green-900">+X hp {/*inserta värde här*/}</p>
          </div>
          <div className="flex justify-between text-xs">
            <p className="text-gray-600">Borttaget:</p>
            <p className="text-red-600">-X hp {/*inserta värde här*/}</p>
          </div>
          <Separator />
          <div className="flex justify-between text-sm ">
            <p>Totalt:</p>
            <p>+X hp {/*inserta värde här*/}</p>
          </div>
        </div>
        <button type="button" disabled className="w-full px-4 py-3 bg-blue-900 text-white rounded-sm font-medium text-sm cursor-pointer disabled:cursor-not-allowed">
          Bekräfta
        </button>
        <button className="w-full px-4 py-3 bg-background hover:bg-highlight-2 hover:text-red-900 font-medium rounded-sm text-sm cursor-pointer">Avbryt</button>
      </footer>
    </main>
  );
}
