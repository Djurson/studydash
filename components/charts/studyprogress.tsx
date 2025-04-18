"use client";

import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

export function StudyProgress() {
  const currentCredits = 153; // hämta från helper funktion sen
  const [progress, setProgress] = React.useState(13);
  const percentage = (currentCredits / 300) * 100;

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col justify-between h-full gap-8 py-6">
      <div className="flex justify-between items-center">
        <span className="text-3xl font-semibold flex items-end gap-2">
          {percentage}%<p className="text-sm text-muted-foreground font-normal text-end"> av utbildningen avklarad</p>
        </span>
        <Select value={"Alla"}>
          <SelectTrigger className="w-[8rem] rounded-lg sm:ml-auto cursor-pointer" aria-label="Select a value">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Kandidaten
            </SelectItem>
            <SelectItem value="180d" className="rounded-lg">
              Mastern
            </SelectItem>
            <SelectItem value="Alla" className="rounded-lg">
              Alla
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Progress value={progress} className="w-[100%] h-4" />
        <p className="text-xs text-muted-foreground">153/300 hp</p>
      </div>
    </main>
  );
}
