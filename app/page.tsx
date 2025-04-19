import ChartLanding from "@/components/chartLanding";
import { UserAuthActionButton } from "@/components/main/accountbutton";
import Tasks from "@/components/tasks";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { SignInActionGoogle } from "./actions";
import { cn } from "@/lib/utils";

export default async function Home() {
  return (
    <>
      <section className="relative flex flex-col min-h-[100dvh] w-full bg-background">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:30px_30px]",
            "[background-image:radial-gradient(#6e6e73_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <section className="flex flex-col gap-2 items-center justify-center bg-transparent z-50 min-h-[90dvh]">
          <h1 className="text-5xl font-extrabold text-foreground md:text-8xl bg-transparent">Study Dash</h1>
          <div className="w-max z-50 bg-transparent">
            <h2 className="text-xl font-semibold text-accent-foreground md:text-2xl animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-foreground pr-5 bg-transparent">
              Effektivisera din studiegång
            </h2>
          </div>
          <div className="flex gap-4 mt-4 border-2 border-foreground rounded-md">
            <UserAuthActionButton onClick={SignInActionGoogle}>Logga in/Skapa konto</UserAuthActionButton>
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
            <h3 className="shrink-1 text-3xl font-extrabold text-foreground md:text-5xl">Håll koll på dina högskolepoäng</h3>
            <p className="text-lg font-bold text-gray-600 md:text-xl">Få en överblick över hela din studiegång, se vilka perioder du presterat som bäst!</p>
          </div>
          <ChartLanding />
        </section>
        <section className="flex flex-col items-center justify-center w-full gap-6 md:gap-12">
          <div className="flex gap-18 justify-center items-center">
            <div className="flex flex-col">
              <h4 className="shrink-1 text-3xl font-extrabold text-foreground md:text-5xl">Håll koll på dina högskolepoäng</h4>
              <p className="text-lg font-bold text-gray-600 md:text-xl">Få en överblick över hela din studiegång, se vilka perioder du presterat som bäst!</p>
            </div>
            <Tasks />
          </div>
        </section>
      </section>
    </>
  );
}
