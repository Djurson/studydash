"use client";

import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { CircleOff } from "lucide-react";
import { useStudyResult } from "@/hooks/editcontext";
import { Course } from "@/utils/types";

export function ChangeHistory() {
  const { studyResults } = useStudyResult();
  return (
    <main className="flex flex-col bg-accent rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full max-h-[66.1vh]">
      <header className="p-4 flex gap-4 items-center justify-center">
        <p className="text-center bg-blue-200 dark:bg-highlight px-1 py-1 rounded-md">{studyResults.size}</p>
        <p className="text-lg">Ändringar gjorda</p>
      </header>
      <Separator className="bg-secondary" />
      <section className="px-4 overflow-auto flex-1">
        {/*Mapa ändringar nedan*/}
        <div className="py-2">
          {" "}
          <div className="flex gap-2 items-center">
            <Checkbox className="h-[1.188rem] w-[1.188rem]"></Checkbox>
            <p className="text-sm">Ändring 1</p>
          </div>
        </div>
        <Separator />
      </section>
      <section className="px-4">
        {studyResults.size === 0 ? (
          <div className="flex flex-col justify-center items-center py-2">
            <CircleOff className="h-8 aspect-square" />
            <p className="text-sm">Inga ändringar gjorda</p>
          </div>
        ) : (
          Array.from(studyResults.entries()).map(([key, course]) => (
            <p key={key}>
              {course.code} - {course.name}
            </p>
          ))
        )}
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
