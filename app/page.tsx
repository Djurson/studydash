import ChartLanding from "@/components/chartLanding";
import Tasks from "@/components/tasks";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full gap-2 min-h-[90dvh]">
        <h1 className="text-5xl font-extrabold text-gray-900 md:text-7xl">Study Dash</h1>
        <h2 className="text-xl font-semibold text-gray-600 md:text-2xl">Effektivisera din studiegång</h2>
        <div className="flex gap-4 mt-4">
          <Link href={'/sign-in'}>
            <button className="px-6 py-2 font-medium bg-gray-900 border-2 border-gray-900 rounded-md text-white-400 hover:shadow-xl hover:shadow-gray-900/25 duration-400 hover:cursor-pointer">Logga in</button>
          </Link>
          <Link href={'/sign-up'}>
            <button className="px-6 py-2 font-medium text-gray-900 transition ease-in-out border-2 border-gray-600 rounded-md bg-white-400 hover:shadow-xl hover:shadow-gray-900/25 duration-400 hover:cursor-pointer">Skapa konto</button>
          </Link>
        </div>
      </section>
      <div className="flex w-full justify-center min-h-[10dvh]">
        <Link href={"#control"} scroll={true} className="group">
          <div className="flex items-center gap-4 w-fit animate-bounce">
            <p className="font-semibold text-gray-600 transition-all duration-400 ease-in-out group-hover:[text-shadow:_0_4px_8px_rgba(110,110,115,0.6)]">Läs mer</p>
            <ChevronDown className="text-gray-600 stroke-4 stroke-gray-600" />
          </div>
        </Link>
      </div>
      <section id="control" className="flex flex-col items-center justify-center w-full gap-6 min-h-[80dvh] md:gap-12">
        <div className="flex flex-col justify-evenly gap-3 w-full items-center md:gap-8">
          <h3 className="shrink-1 text-3xl font-extrabold text-gray-900 md:text-5xl">Håll koll på dina högskolepoäng</h3>
          <p className="text-lg font-bold text-gray-600 md:text-xl">Få en överblick över hela din studiegång, se vilka perioder du presterat som bäst!</p>
        </div>
        <ChartLanding />
      </section>
      <section className="flex flex-col items-center justify-center w-full gap-6 md:gap-12">
        <div className="flex gap-18 justify-center items-center">
          <div className="flex flex-col">
            <h4 className="shrink-1 text-3xl font-extrabold text-gray-900 md:text-5xl">Håll koll på dina högskolepoäng</h4>
            <p className="text-lg font-bold text-gray-600 md:text-xl">Få en överblick över hela din studiegång, se vilka perioder du presterat som bäst!</p>
          </div>
          <Tasks />
        </div>
      </section>
    </>
  );
}
