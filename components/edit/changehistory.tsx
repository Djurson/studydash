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

  const filteredStudies = Array.from(studyResults.current.entries()).filter(([coursecode, course]) => Array.from(course.examinations.values()).some((exam) => exam.grade !== ""));
  console.log(filteredStudies);
  return (
    <main className="flex flex-col bg-accent rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full max-h-[66.1vh]">
      <header className="p-4 flex gap-4 items-center justify-center">
        <div className="text-center bg-blue-200 dark:bg-highlight px-1.5 rounded-md ">
          <p>{filteredStudies.length}</p>
        </div>
        <p className="text-lg">Ändringar gjorda</p>
      </header>
      <Separator className="bg-secondary" />
      <section className="px-4 overflow-auto">
        {filteredStudies.length !== 0 && (
          <>
            <div className="py-2.5 flex flex-col justify-between items-start gap-2">
              {filteredStudies.length !== 0 &&
                filteredStudies.map(([coursecode, course]) => {
                  return [...course.examinations.entries()]
                    .filter(([examkey, exam]) => exam.grade !== "")
                    .map(([examcode, examination]) => {
                      plusHp += examination.hp;
                      return (
                        <div className="flex gap-2 items-center" key={examcode}>
                          <StatusSquare status="added" />
                          <p className="text-sm">
                            {coursecode}/{examination.code}/{examination.name}
                          </p>
                        </div>
                      );
                    });
                })}
            </div>
          </>
        )}
        {/* <Checkbox className="h-[1.188rem] w-[1.188rem]"></Checkbox>
          <p className="text-sm">Kursnamn</p>
          <StatusSquare status="added" defaultStatus="none" /> */}
        {filteredStudies.length === 0 && (
          <>
            {/* <Separator /> */}
            <div className="flex flex-col justify-center items-center py-2">
              <CircleOff className="h-8 aspect-square" />
              <p className="text-sm">Inga ändringar gjorda</p>
            </div>
          </>
        )}
      </section>
      <Separator />
      <footer className="flex flex-col p-4 gap-4">
        <div className="flex flex-col gap-2">
          {/*Denna div ska dyka upp om ändringar gjorts*/}
          {filteredStudies.length !== 0 && (
            <div className="flex justify-between text-sm ">
              <p>Tillagt:</p>
              <p className="text-green-900">+{plusHp} hp</p>
            </div>
          )}
        </div>
        <button type="button" disabled className="w-full px-4 py-3 bg-blue-900 text-white rounded-sm font-medium text-sm cursor-pointer disabled:cursor-not-allowed">
          Bekräfta
        </button>
        <button className="w-full px-4 py-3 bg-background hover:bg-highlight-2 hover:text-red-900 font-medium rounded-sm text-sm cursor-pointer">Avbryt</button>
      </footer>
    </main>
  );
}
