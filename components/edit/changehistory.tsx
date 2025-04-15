"use client";

import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { CircleOff } from "lucide-react";
import { useStudyResultsListener } from "@/hooks/editcontext";
import { Course } from "@/utils/types";
import { StatusSquare } from "./statussquare";

export function ChangeHistory() {
  const { studyResults } = useStudyResultsListener();

  let plusHp = 0;
  let minusHp = 0;
  return (
    <main className="flex flex-col bg-accent rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full max-h-[66.1vh]">
      <header className="p-4 flex gap-4 items-center justify-center">
        <div className="text-center bg-blue-200 dark:bg-highlight px-1.5 rounded-md ">
          <p>{studyResults.current.size}</p>
        </div>
        <p className="text-lg">Ändringar gjorda</p>
      </header>
      <Separator className="bg-secondary" />
      <section className="px-4 overflow-auto">
        {/*Mapa ändringar nedan, tänker formatet: Kursnam/kurskod  */}
        {/* Ok, tänker att bara kursnamn behövs i så fall:
            ändrat i kurs som saknar ifyllda värden -> status="added"
            ändrat i kurs som har ifyllda värden -> status="changed"
            tagit bort värden i en kurs som har ifylda värden -> status="removed"
            om det går att göra på det här sättet.
        */}
        {/* //  */}
        <div className="py-2.5 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Checkbox className="h-[1.188rem] w-[1.188rem]"></Checkbox>
            <p className="text-sm">Kursnamn</p>
          </div>
          <StatusSquare status="added" defaultStatus="none" />
        </div>
        <Separator />
        <div className="flex flex-col justify-center items-center py-2">
          {studyResults.current.size === 0
            ? (
              <>
                <CircleOff className="h-8 aspect-square" />
                <p className="text-sm">Inga ändringar gjorda</p>
              </>
            )
            : (
              [...studyResults.current.entries()].map(([key, course]) => {
                plusHp += course.hp
                return (
                  <div key={key} className="flex gap-4 justify-start">
                    <StatusSquare status="added" />
                    <p className="text-sm font-bold">
                      {course.code} - {course.name}
                    </p>
                    <div className="flex flex-col">
                      {[...course.examinations.entries()].map(([keyexam, examination]) => (
                        <p key={keyexam} className="text-sm">{examination.code} - {examination.name}</p>
                      ))}
                    </div>
                  </div>
                )
              })
            )}
        </div>
      </section>
      <Separator />
      <footer className="flex flex-col p-4 gap-4">
        <div className="flex flex-col gap-2">
          {/*Denna div ska dyka upp om ändringar gjorts*/}
          {studyResults.current.size === 0
            ? <></>
            : <>
              <div className="flex justify-between text-xs ">
                <p className="text-gray-600">Tillagt:</p>
                <p className="text-green-900">+{plusHp} hp</p>
              </div>
              <div className="flex justify-between text-xs">
                <p className="text-gray-600">Borttaget:</p>
                <p className="text-red-600">-{minusHp} hp</p>
              </div>
              <Separator />
              <div className="flex justify-between text-sm ">
                <p>Totalt:</p>
                <p>+{plusHp - minusHp} hp</p>
              </div></>}
        </div>
        <button type="button" disabled className="w-full px-4 py-3 bg-blue-900 text-white rounded-sm font-medium text-sm cursor-pointer disabled:cursor-not-allowed">
          Bekräfta
        </button>
        <button className="w-full px-4 py-3 bg-background hover:bg-highlight-2 hover:text-red-900 font-medium rounded-sm text-sm cursor-pointer">Avbryt</button>
      </footer>
    </main>
  );
}
