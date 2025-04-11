"use client";

import { Separator } from "../ui/separator";

export function ChangeHistory() {
  return (
    <main className="bg-accent rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full">
      <header className="p-4 flex gap-4 items-center justify-center">
        <div className="w-5 h-5 rounded-sm bg-blue-200 dark:bg-highlight flex items-center justify-center">
          <p className="text-center">0</p>
        </div>
        <p className="text-lg">Ändringar gjorda</p>
      </header>
      <Separator className="bg-secondary" />
      <section className="px-4">
        {" "}
        <p className="text-center p-20">Inga ändringar har gjorts</p>
      </section>
      <Separator className="bg-secondary" />
      <footer className="flex flex-col p-4 gap-4">
        <button type="button" disabled className="w-full px-4 py-3 bg-blue-900 text-white rounded-sm text-sm cursor-pointer disabled:cursor-not-allowed">
          Bekräfta
        </button>
        <button className="w-full px-4 py-3 bg-muted rounded-sm text-sm cursor-pointer">Avbryt</button>
      </footer>
    </main>
  );
}
