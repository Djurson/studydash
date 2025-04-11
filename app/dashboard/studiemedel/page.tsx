"use client"

import * as React from "react"
import CardProgress from "@/components/card/card-progress"

// Properly format the data for Recharts

export default function Page() {
  return (
    <>
      <header>
        <div className="ml-4">
          <h2>Mitt studiemedel</h2>
        </div>
      </header>
      <main className="w-full h-[35rem] grid grid-cols-1 grid-rows-5 mt-4 gap-4">
          <CardProgress year="1" startyear={2022} hp={37} complete="true"></CardProgress>
          <CardProgress year="2" startyear={2023} hp={80} complete="false"></CardProgress>
          <CardProgress year="3" startyear={2024} hp={80} complete="false"></CardProgress>
          <CardProgress year="4" startyear={2025} hp={80} complete="false"></CardProgress>
          <CardProgress year="5" startyear={2026} hp={80} complete="false" ></CardProgress>
      </main>
    </>
  );
}