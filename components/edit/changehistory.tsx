"use client";

import { useStudyResult } from "@/hooks/editcontext";
import { Separator } from "../ui/separator";
import { Course } from "@/utils/types";

export function ChangeHistory() {
  const { studyResults } = useStudyResult();
  return (
    <main className="bg-accent rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full">
      <header className="p-4 flex gap-4 items-center justify-center">
        <p className="text-center bg-blue-200 dark:bg-highlight px-1 py-1 rounded-md">{studyResults.size}</p>
        <p className="text-lg">Ändringar gjorda</p>
      </header>
      <Separator />
      <section className="px-4">
        {studyResults.size === 0 ? <p className="text-center p-20">Inga ändringar har gjorts</p> : Array.from(studyResults.entries()).map(([key, course]) => <p key={key}>{course.code}</p>)}
      </section>
      <Separator />
      <footer className="flex flex-col p-4 gap-4">
        <button type="button" disabled className="w-full px-4 py-3 bg-blue-900 text-white rounded-sm text-sm cursor-pointer disabled:cursor-not-allowed">
          Bekräfta
        </button>
        <button className="w-full px-4 py-3 bg-secondary rounded-sm text-sm cursor-pointer">Avbryt</button>
      </footer>
    </main>
  );
}
