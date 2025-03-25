import Card from "@/components/card/card";

export default function Page() {
  return (
    <>
      <main className="w-full h-full bg-amber-200 grid grid-cols-5 grid-rows-2 gap-4">
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
