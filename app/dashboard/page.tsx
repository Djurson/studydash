import Card from "@/components/card/card";
import CardCarousel from "@/components/card/card-carousel";
import LiuImg from "@/assets/liu.png";
import { PillbuttonContainer } from "@/components/main/pillbutton";
import { StudyFunds } from "@/components/charts/studyfunds";
import { MeritPoints } from "@/components/charts/meritpoints";
import { Credits } from "@/components/charts/credits";
import { StudyProgress } from "@/components/charts/studyprogress";

export default function Page() {
  return (
    <>
      <header className="flex items-center">
        <img src={LiuImg.src} alt="" className="h-[5.5rem] dark:grayscale-100 dark:invert" />
        <div className="ml-4">
          <p className="text-xl font-semibold text-muted">300hp</p>
          <h1 className="text-3xl font-semibold">Civilingenjörsprogram i medieteknik.</h1>
        </div>
      </header>
      <main className="w-full h-[28.25rem] grid grid-cols-5 grid-rows-2 gap-4 mt-4 ">
        <div className="row-span-2 col-span-2">
          <Card variant="header" cardTitle="Intjänade högskolepoäng">
            <Credits />
          </Card>
        </div>
        <Card variant="header" cardTitle="Studiemedelskrav">
          <StudyFunds />
        </Card>
        <Card variant="header" cardTitle="Medelmerit">
          <MeritPoints />
        </Card>

        <div className="row-span-2 ">
          <Card variant="header" cardTitle="Mina kurser"></Card>
        </div>
        <div className="col-span-2 ">
          <Card variant="header" cardTitle="Mina studieframsteg">
            <StudyProgress />
          </Card>
        </div>
      </main>
      <section className="mt-4">
        <h2 className="text-2xl font-semibold">Kommande tentor för dig</h2>
        <PillbuttonContainer />

        <CardCarousel />
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Dina prestationer</h2>
      </section>
    </>
  );
}
