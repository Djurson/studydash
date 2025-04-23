"use client";

import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useMemo } from "react";
import { WithAuthProps, Examination } from "@/utils/types";
import { MapToChartsArray } from "@/utils/converters";

type periodType = "kandidat" | "master" | "total";

// kan stoppas in i helper js fil och ändras utifrån databas data
const programCredits = {
  kandidat: 180,
  master: 120,
  total: 300,
};

// funktion för att kolla om ett examinationsmoment är inom kandidat perioden
function isKandidatPeriod(date: string, startYear: number): boolean {
  const examDate = new Date(parseInt(date.slice(0, 4)), parseInt(date.slice(4, 6)) - 1, parseInt(date.slice(6, 8)));
  const kandidatEnd = new Date(startYear + 3, 7, 31);
  return examDate <= kandidatEnd;
}

export function StudyProgress({ userData }: Partial<WithAuthProps>) {
  const [selectedPeriod, setselectedPeriod] = React.useState<periodType>("total");
  const [progress, setProgress] = React.useState(0);
  const startYear = Number.parseInt(userData?.studyyear ?? "2022");

  const earnedCredits = useMemo(() => {
    if (!userData?.sortedDateMap) return { kandidat: 0, master: 0, total: 0 };

    let kandidatCredits = 0;
    let masterCredits = 0;
    let totalCredits = 0;

    // konvertera Map entries till array av examinationer
    const exams: Examination[] = [];
    userData.sortedDateMap.forEach((examArray) => {
      exams.push(...examArray);
    });

    // sortera hp efter perioderna
    exams.forEach((exam) => {
      const credits = exam.hp;
      totalCredits += credits;

      if (isKandidatPeriod(exam.date, startYear)) {
        kandidatCredits += credits;
      } else {
        masterCredits += credits;
      }
    });

    return {
      kandidat: kandidatCredits,
      master: masterCredits,
      total: totalCredits,
    };
  }, [userData?.sortedDateMap, startYear]);

  // beräknar procent för vald period
  const percentage = React.useMemo(() => {
    const totalCredits = programCredits[selectedPeriod];
    const earned = earnedCredits[selectedPeriod];
    return Math.round((earned / totalCredits) * 100);
  }, [selectedPeriod, earnedCredits]);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  const handlePeriodChange = (value: periodType) => {
    if (value === "kandidat" || value === "master" || value === "total") {
      setselectedPeriod(value);
    }
  };

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
          {earnedCredits[selectedPeriod]}/{programCredits[selectedPeriod]} hp
        </p>
      </div>
    </main>
  );
}
