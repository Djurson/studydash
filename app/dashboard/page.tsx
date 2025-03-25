import Card from "@/components/card/card";
import LiuImg from "@/assets/liu.png";

export default function Page() {
  return (
    <>
      <header className="flex items-center">
        <img src={LiuImg.src} alt="" className="h-[5.5rem]" />
        <div className="ml-4">
          <p className="text-xl font-semibold text-gray-600">300hp</p>
          <h1 className="text-3xl font-semibold">
            Civilinegjörsprogram i medieteknik.
          </h1>
        </div>
      </header>
      <main className="w-full h-full grid grid-cols-5 grid-rows-2 gap-4">
        <div className="row-span-2 col-span-2">
          <Card cardTitle="Intjänade högskolepoäng"></Card>
        </div>
        <Card cardTitle="Studiemedelskrav"></Card>
        <Card cardTitle="Medelmerit"></Card>
        <div className="row-span-2 ">
          <Card cardTitle="Mina kurser"></Card>
        </div>
        <div className="col-span-2 ">
          <Card cardTitle="Mina studieframsteg"></Card>
        </div>
      </main>
    </>
  );
}
