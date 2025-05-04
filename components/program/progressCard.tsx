"use client";

import { Progress } from "@/components/ui/progress";
import React, { useMemo } from "react";
import { WithAuthProps, Examination, Program } from "@/utils/types";
import LiuImg from "@/assets/liu.png";
import { ExternalLink } from "lucide-react";

export function ProgressCard({ userData, url, credits }: Partial<WithAuthProps> & Partial<Program>) {
  const programCredits = useMemo(() => {
    if (!credits) return 0;
    const creditsNumber = parseInt(credits.replace(/\D/g, ""));
    return isNaN(creditsNumber) ? 0 : creditsNumber;
  }, [credits]);

  const [progress, setProgress] = React.useState(0);

  const earnedCredits = useMemo(() => {
    if (!userData?.sortedDateMap) return 0;

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
    });

    return totalCredits;
  }, [userData?.sortedDateMap]);

  // beräknar procent för vald period
  const percentage = useMemo(() => {
    // check så att båda är nummer och det intle blir division med 0
    if (typeof earnedCredits !== "number" || typeof programCredits !== "number") {
      return 0;
    }
    if (programCredits <= 0) return 0;

    return Math.round((earnedCredits / programCredits) * 100);
  }, [earnedCredits, programCredits]);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <main className="flex flex-col gap-2">
      <div className="flex items-center">
        <img src={LiuImg.src} alt="" className="h-[4.25rem] dark:grayscale-100 dark:invert" />
        <a href={url} target="_blank" className="ml-4">
          <p className="text-sm font-semibold text-gray-600">{credits}</p>
          <div className="flex items-center gap-2 hover:underline">
            <h2 className="text-2xl font-semibold">{userData?.program}.</h2>
            <ExternalLink />
          </div>
        </a>
      </div>
      <div className="flex flex-col gap-2">
        <Progress value={progress} className="w-[100%] h-4" />
        <p className="text-sm font-light text-muted">
          {percentage}% avklarad | {earnedCredits}/{programCredits} hp
        </p>
      </div>
    </main>
  );
}
