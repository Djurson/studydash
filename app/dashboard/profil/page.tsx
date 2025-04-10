import { ThemeSwitcher } from "@/components/supabase-template/theme-switcher";
import React, { useState } from "react";
import Card from "@/components/card/card";
import {SquareUserRound} from "lucide-react";
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
          <div className="row-span-1 col-span-1 c-green">
           
            <div className="flex item-center justify-between">
            <h2>Användare</h2>
                  <SquareUserRound color="white" size={34} />
                </div>
            <Card variant="no-header" cardTitle=""> 
              <div className="w-full flex items-center justify-center">
            
              </div>
            </Card>
          </div>
          <div className="row-span-1 col-span-1">
            <h2>Statistik</h2>
            <Card variant="no-header" cardTitle=""></Card>
          </div>
          <div className="row-span-1 col-span-1">
            <h2>Användardata</h2>
            <Card variant="no-header" cardTitle=""></Card>
          </div>
        </main>
        <section className="w-full h-[40rem] grid grid-cols-3 grid-rows-2 pb-[4rem]" >
          <div className="row-span-2  col-span-3">
            <h2>Mina prestationer</h2>
            <Card variant="no-header" cardTitle=""></Card>  
          </div>
        </section>
        <section className="w-full h-[20rem] grid grid-cols-3 grid-rows-1 gap-4 mt-4 pb-[4rem]">
          <div className="row-span-1 col-span1">
            <Card variant="no-header" cardTitle="">
              <div className="w-full flex items-center justify-between"> 
                <div className="bg-">
                  <p>Logga ut</p>   
                </div>
                <div>
                  <p>Ta bort</p>
                </div>
              </div>
             

            </Card>
          </div> 
        </section>

                        
    </>
  );
}
