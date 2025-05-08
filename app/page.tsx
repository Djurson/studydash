"use server";

import ChartLanding from "@/components/landingpage/chartLanding";
import { UserAuthActionButton } from "@/components/main/accountbutton";
import Tasks from "@/components/tasks";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { SignInActionGoogle } from "./actions";
import { cn } from "@/lib/utils";

export default async function Page() {
  return (
    <>
      <section className="relative flex flex-col min-h-dvh w-full bg-background">
        <div
          className={cn(
            "absolute inset-0 z-0",
            "[background-size:24px_24px]",
            "[background-image:radial-gradient(#b2b2b2_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <section className="flex flex-col gap-4 items-center justify-center bg-transparent z-20 min-h-[90dvh]">
          <h1 className="text-5xl font-black text-foreground md:text-8xl bg-transparent">Study Dash</h1>
          <div className="w-max z-20 bg-transparent">
            <h2 className="text-xl font-bold text-accent-foreground md:text-2xl animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-foreground pr-5 bg-transparent">
              Effektivisera din studiegång
            </h2>
          </div>
          <div className="flex gap-4 mt-4 border-2 border-foreground/25 rounded-md">
            <UserAuthActionButton onClick={SignInActionGoogle}>Logga in/Skapa konto</UserAuthActionButton>
          </div>
        </section>
        <div className="flex w-full justify-center h-fit z-20">
          <Link href={"#control"} scroll={true} className="group">
            <div className="flex items-center gap-4 w-fit animate-bounce h-fit">
              <p className="font-semibold text-gray-600 transition-all duration-400 ease-in-out group-hover:[text-shadow:_0_4px_8px_rgba(110,110,115,0.6)]">Läs mer</p>
              <ChevronDown className="text-gray-600 stroke-4 stroke-gray-600" />
            </div>
          </Link>
        </div>
        <section id="control" className="flex flex-col items-center justify-center w-full gap-6 min-h-[80dvh] md:gap-12">
          <div className="flex w-11/12 gap-8">
            <div className="flex flex-col justify-center gap-3 w-2/3 items-start z-20">
              <h3 className="shrink-1 text-3xl font-extrabold text-foreground md:text-5xl z-20">Få kontroll på din studiegång</h3>
              <p className="text-lg font-bold text-gray-600 md:text-xl z-20">
                Vår plattform ger dig en tydlig översikt över dina högskolepoäng, avslutade kurser och vad som återstår för examen, allt samlat på ett och samma ställe, inga fler kalkylark. Bara du
                och dina mål
              </p>
            </div>
            <ChartLanding />
          </div>
        </section>
        <section className="flex flex-col items-center justify-center w-full gap-6 min-h-[80dvh] md:gap-12">
          <div className="flex w-11/12 gap-8 justify-center">
            <Tasks />
            <div className="flex flex-col justify-center gap-3 w-3/7 items-start z-20">
              <h3 className="shrink-1 text-3xl font-extrabold text-foreground md:text-5xl z-20">Plugga smartare, inte hårdare</h3>
              <p className="text-lg font-bold text-gray-600 md:text-xl z-20">
                Med hjälp av interaktiva verktyg kan du planera kurser, följa upp CSN-krav och se exakt vad som krävs för examen. Du slipper detektivjobbet och kan fokusera på det viktiga: att klara
                nästa tenta.
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
