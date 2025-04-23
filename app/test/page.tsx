import CardCarousel from "@/components/card/card-carousel";
import LiuImg from "@/assets/liu.png";
import { PillbuttonContainer } from "@/components/main/pillbutton";
import CardLoading from "@/components/card/card-loading";
import CreditsLoading from "@/components/charts/credits-loading";

export default async function Loading() {
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
          <CardLoading>
            <CreditsLoading />
          </CardLoading>
        </div>
        <CardLoading />
        <CardLoading />

        <div className="row-span-2 ">
          <CardLoading />
        </div>
        <div className="col-span-2 ">
          <CardLoading />
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
