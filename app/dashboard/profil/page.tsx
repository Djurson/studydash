import { ThemeSwitcher } from "@/components/supabase-template/theme-switcher";
import React, { useState } from "react";
import { Button }from "@/components/ui/button"
import Card from "@/components/card/card";
import {SquareUserRound, ChartNoAxesCombined, FileUser, Download} from "lucide-react";
export default function Page() {
  return (
    <>
   <header className="flex items-center">
        <div className="ml-4">
          <h1 className="text-3xl font-semibold">
            Profil
          </h1>
        </div>
      </header>
        <main className="w-full h-[20rem] grid grid-cols-3 grid-rows-1 gap-4 mt-4 pb-[4rem]">
          <div className="row-span-1 col-span-1">
            <div className="flex item-center justify-between">
              <h2>Användare</h2>
              <SquareUserRound color="black" size={34}/>
            </div>
            <Card variant="no-header" cardTitle=""> 
              <div className="w-full flex items-center justify-center">
              </div>
            </Card>
          </div>
          <div className="row-span-1 col-span-1">
            <div className="flex items-center justify-between">
              <h2>Statistik</h2>
              <ChartNoAxesCombined color="black" size={34}/> 
            </div>
            <Card variant="no-header" cardTitle=""></Card>
          </div>
          <div className="row-span-1 col-span-1">
            <div className="flex items-center justify-between">
              <h2>Användardata</h2>
              <FileUser color="black" size={34}/> 
            </div>
            <Card variant="no-header" cardTitle="">
              <div className="grid grid-cols-1 grid-row2">
                <div className="flex items-center justify-center">
                  <p>Här kan du ladda ner din användardata som en PDF!</p>
                </div>
                <div className="flex">
                  <Button size="lg" className="bg-green-900 w-full h-[5rem]" >
                    <Download color="white" size={200}></Download> 
                  </Button>
                </div>
              </div> 
            </Card>
          </div>
        </main>
        <section className="w-full h-[40rem] grid grid-cols-3 grid-rows-2 pb-[4rem]" >
          <div className="row-span-2  col-span-3">
            <h2>Mina prestationer</h2>
            <Card variant="no-header" cardTitle=""></Card>  
          </div>
        </section>
        <section className="w-[20rem] h-[15rem]">
          <div className="row-span-1 col-span1">
            <Card variant="no-header" cardTitle="">
              <div className="w-full flex items-center justify-between"> 
                <div className="bg-gray-200 rounded-2xl m-[1rem] p-[1rem]">
                  <p>Logga ut</p>   
                </div>
                <div className="bg-red-900 rounded-2xl p-[1rem]">
                  <p>Ta bort konto</p>
                </div>
              </div>
             

            </Card>
          </div> 
        </section>

                        
    </>
  );
}
