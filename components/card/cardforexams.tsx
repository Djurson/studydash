"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import examsData from '@/data/Examdates.json';
import { Examination, WithAuthProps } from "@/utils/types";

interface Exam {
  kurskod: string;
  examinationsmoment: string;
  kursnamn: string;
  hp: string;
  tillfällen: {
    datum: string;
    tid: string;
  }[];
}

export default function CardForExams({ userData }: Partial<WithAuthProps>) {
  const carouselRef = useRef<HTMLUListElement>(null);
  
  const missingExams = useMemo(() => {
    if (!userData?.studyinfo) return [];

    const userExamCodes = new Set<string>();
    userData.studyinfo.forEach(course => {
      course.examinations.forEach(exam => {
        userExamCodes.add(`${course.code}-${exam.code}`);
      });
    });

    const getNearestDate = (exam: Exam) => {
      const upcoming = exam.tillfällen
        .map(t => t.datum)
        .sort()
        .find(date => new Date(date) >= new Date());
      return upcoming ? new Date(upcoming).getTime() : Infinity;
    };

    return examsData
      .filter(exam => !userExamCodes.has(`${exam.kurskod}-${exam.examinationsmoment}`))
      .sort((a, b) => getNearestDate(a) - getNearestDate(b));
  }, [userData]);


  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year.slice(-2)}`;
  };

  const getDaysRemaining = (examDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDay = new Date(examDate);
    const timeDiff = examDay.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const getDaysRemainingText = (days: number) => {
    return `${days} dagar kvar`;
  };

  const getBadgeColor = (days: number) => {
    if (days === 0) return "bg-red-500"; 
    if (days <= 20) return "bg-yellow-500"; 
    return "bg-green-500"; 
  };

  return (
    <div className="space-y-8">
      <ul
  className="flex w-full overflow-x-auto drop-shadow-[2px_4px_12px_rgba(0,0,0,0.08)] px-regular snap-mandatory snap-x scroll-smooth container-snap no-scrollbar"
  ref={carouselRef}
>
  {missingExams.map((exam, index) => {
    const upcomingDate = exam.tillfällen
      .map(t => t.datum)
      .sort()
      .find(date => new Date(date) >= new Date());

    const displayDate = upcomingDate || exam.tillfällen[0]?.datum;
    const formattedDate = displayDate ? formatDate(displayDate) : "N/A";

    const daysRemaining = displayDate ? getDaysRemaining(displayDate) : null;
    const daysRemainingText = daysRemaining !== null ? getDaysRemainingText(daysRemaining) : "N/A";
    const badgeColor = daysRemaining !== null ? getBadgeColor(daysRemaining) : "bg-gray-400";

    return (
      <li
        className={`w-[13.625rem] my-4 mr-4 last:mr-0 p-4 bg-accent rounded-2xl shrink-0 shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] snap-start snap-normal 
          ${index === 0 ? "snap-start" : ""} 
          ${index === missingExams.length - 1 ? "snap-end" : ""}`}
        key={`${exam.kurskod}-${exam.examinationsmoment}-${index}`}
      >
        <header className="flex items-center h-[2rem]">
          <p className="text-sm font-semibold">{exam.kursnamn}</p>
        </header>

        <section className="mt-4 flex flex-col gap-2 text-xs text-gray-600 font-normal">
          <div className="flex justify-between">
            <p>{exam.kurskod}</p>
            <p>{formattedDate}</p>
          </div>

          <div className="flex justify-between">
            <p>{exam.examinationsmoment}</p>
            <p>{exam.hp}</p>
          </div>
        </section>

        <footer className="mt-2 flex justify-end">
          <span className={`${badgeColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
            {daysRemainingText}
          </span>
        </footer>
      </li>
    );
  })}
</ul>
</div>
  )
}