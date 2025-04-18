"use client";

import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

type periodType = "kandidat" | "master" | "total";

// kan stoppas in i helper js fil och ändras utifrån databas data
const programCredits = {
  kandidat: 180,
  master: 120,
  total: 300,
};

// hämta från helper funktion sen mha databas data
const earnedProgramCredits = {
  kandidat: 153,
  master: 0,
  total: 153,
};

export function StudyProgress() {
  const [selectedPeriod, setselectedPeriod] = React.useState<periodType>("total");
  const [progress, setProgress] = React.useState(0);

  const handlePeriodChange = (value: periodType) => {
    if (value === "kandidat" || value === "master" || value === "total") {
      setselectedPeriod(value);
    }
  };

  // beräknar procent för vald period
  const percentage = React.useMemo(() => {
    const totalCredits = programCredits[selectedPeriod];
    const earnedCredits = earnedProgramCredits[selectedPeriod];
    return Math.round((earnedCredits / totalCredits) * 100);
  }, [selectedPeriod]);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <main className="flex flex-col justify-between h-full gap-8 py-6">
      <div className="flex justify-between items-center">
        <span className="text-3xl font-semibold flex items-end gap-2 text-end">
          {percentage}%<p className="text-sm text-muted-foreground font-normal text-end"> av utbildningen avklarad</p>
        </span>
        <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[8rem] rounded-lg sm:ml-auto cursor-pointer" aria-label="Select a value">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="kandidat" className="rounded-lg">
              Kandidaten
            </SelectItem>
            <SelectItem value="master" className="rounded-lg">
              Mastern
            </SelectItem>
            <SelectItem value="total" className="rounded-lg">
              Alla
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Progress value={progress} className="w-[100%] h-4" />
        <p className="text-xs text-muted-foreground">
          {earnedProgramCredits[selectedPeriod]}/{programCredits[selectedPeriod]} hp
        </p>
      </div>
    </main>
  );
}
