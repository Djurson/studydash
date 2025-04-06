"use client";

import { Separator } from "../ui/separator";

export function ChangeHistory() {
  return (
    <main className=" bg-white rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full">
      <header className="p-4 flex gap-4 items-center justify-center">
        <div className="w-5 h-5 rounded-sm bg-blue-200 flex items-center justify-center">
          <p className="text-center">0</p>
        </div>
        <p className="text-lg">Ändradringar gjorda</p>
      </header>
      <Separator />
      <section className="px-4">
        {" "}
        <p className="text-center p-20">Inga ändraingar har gjorts</p>
      </section>
      <Separator />
      <footer className="flex flex-col p-4 gap-4">
        <button
          type="button"
          disabled
          className="w-full px-4 py-3 bg-blue-900 text-white rounded-sm text-sm cursor-pointer disabled:cursor-not-allowed">
          Bekräfta
        </button>
        <button className="w-full px-4 py-3 bg-gray-50 rounded-sm text-sm cursor-pointer">
          Avbryt
        </button>
      </footer>
    </main>
  );
}
