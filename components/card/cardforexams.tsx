"use client";

import { useRef, useMemo, useState } from "react";
import examsData from "@/data/Examdates.json";
import { WithAuthProps } from "@/utils/types";
import { Button } from "../ui/button";

type PillButtonProps = React.ComponentProps<typeof Button> & {
  currentValue: string;
};

function PillButton({ currentValue, ...props }: PillButtonProps) {
  return (
    <button
      className={`border-1 px-4 py-1.5 rounded-2xl font-semibold text-sm transition duration-200 ease-in-out
                cursor-pointer hover:text-blue-900 hover:border-blue-900
                ${props.value === currentValue ? "text-blue-900 border-blue-900 bg-highlight dark:text-foreground" : "text-foreground dark:border-muted bg-accent"}`}
      {...props}>
      {props.id}
    </button>
  );
}

function PillbuttonContainer({ currentValue, onMonthChange, availableMonths }: { currentValue: string; onMonthChange: (month: string) => void; availableMonths: string[] }) {
  const allMonths = [
    { id: "Alla", value: "Alla" },
    { id: "Augusti", value: "Augusti" },
    { id: "Oktober", value: "Oktober" },
    { id: "Januari", value: "Januari" },
    { id: "Mars", value: "Mars" },
    { id: "Juni", value: "Juni" },
  ];

  return (
    <div className="mt-4 flex gap-4">
      {allMonths
        .filter((month) => month.value === "Alla" || month.value === "Ordinare" || availableMonths.includes(month.value))
        .map((month) => (
          <PillButton key={month.value} id={month.id} value={month.value} currentValue={currentValue} onClick={() => onMonthChange(month.value)} />
        ))}
    </div>
  );
}

export default function CardForExams({ userData }: Partial<WithAuthProps>) {
  const carouselRef = useRef<HTMLUListElement>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("Alla");

  const { filteredExams, availableMonths } = useMemo(() => {
    if (!userData?.studyinfo) return { filteredExams: [], availableMonths: [] };

    // Get user's exam codes
    const userExamCodes = new Set<string>();
    userData.studyinfo.forEach((course) => {
      course.examinations.forEach((exam) => {
        userExamCodes.add(`${course.code}-${exam.code}`);
      });
    });

    // Get current date
    const currentDate = new Date();

    // Process all exams
    const examsWithDates = examsData
      .filter((exam) => !userExamCodes.has(`${exam.kurskod}-${exam.examinationsmoment}`))
      .map((exam) => {
        const upcomingDate = exam.tillfällen
          .map((t) => t.datum)
          .sort()
          .find((date) => new Date(date) >= currentDate);

        return {
          ...exam,
          upcomingDate,
          upcomingMonth: upcomingDate ? new Date(upcomingDate).getMonth() : null,
        };
      });

    const monthMap: Record<number, string> = {
      7: "Augusti",
      9: "Oktober",
      0: "Januari",
      2: "Mars",
      5: "Juni",
    };

    const monthsWithExams = new Set<string>();
    examsWithDates.forEach((exam) => {
      if (exam.upcomingMonth !== null) {
        const monthName = monthMap[exam.upcomingMonth];
        if (monthName) monthsWithExams.add(monthName);
      }
    });

    let filteredExams = examsWithDates;

    if (selectedMonth !== "Alla") {
      if (selectedMonth === "Ordinare") {
        filteredExams = examsWithDates.filter((exam) => exam.tillfällen.length > 1);
      } else {
        const targetMonth = Object.entries(monthMap).find(([, name]) => name === selectedMonth)?.[0];
        if (targetMonth) {
          filteredExams = examsWithDates.filter((exam) => exam.upcomingMonth === parseInt(targetMonth));
        }
      }
    }

    filteredExams.sort((a, b) => {
      const aDate = a.upcomingDate ? new Date(a.upcomingDate).getTime() : Infinity;
      const bDate = b.upcomingDate ? new Date(b.upcomingDate).getTime() : Infinity;
      return aDate - bDate;
    });

    return {
      filteredExams,
      availableMonths: Array.from(monthsWithExams),
    };
  }, [userData, selectedMonth]);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${year}-${month}-${day}`;
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
    if (days === 0) return "bg-red-900";
    if (days <= 20) return "bg-yellow-900";
    return "bg-green-900";
  };

  return (
    <div className="space-y-1">
      <PillbuttonContainer currentValue={selectedMonth} onMonthChange={setSelectedMonth} availableMonths={availableMonths} />

      <ul className="flex w-full overflow-x-auto drop-shadow-[2px_4px_12px_rgba(0,0,0,0.04)] px-regular snap-mandatory snap-x scroll-smooth container-snap no-scrollbar" ref={carouselRef}>
        {filteredExams.map((exam, index) => {
          const displayDate = exam.upcomingDate || exam.tillfällen[0]?.datum;
          const formattedDate = displayDate ? formatDate(displayDate) : "N/A";

          const daysRemaining = displayDate ? getDaysRemaining(displayDate) : null;
          const daysRemainingText = daysRemaining !== null ? getDaysRemainingText(daysRemaining) : "N/A";
          const badgeColor = daysRemaining !== null ? getBadgeColor(daysRemaining) : "bg-gray-400";

          return (
            <li
              className={`w-[13.625rem] my-4 mr-4 last:mr-0 p-4 bg-accent rounded-2xl shrink-0 shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.04)] snap-start snap-normal flex flex-col
                ${index === 0 ? "snap-start" : ""}
                ${index === filteredExams.length - 1 ? "snap-end" : ""}`}
              key={`${exam.kurskod}-${exam.examinationsmoment}-${index}`}>
              
              {/* Course name with fixed height */}
              <header className="h-12 flex items-center">
                <p className="text-sm font-semibold line-clamp-2">{exam.kursnamn}</p>
              </header>

              {/* Middle section with fixed height */}
              <section className="mt-2 flex-grow flex flex-col justify-between">
                <div className="flex justify-between text-xs text-gray-600 font-normal">
                  <p>{exam.kurskod}</p>
                  <p>{formattedDate}</p>
                </div>

                <div className="flex justify-between text-xs text-gray-600 font-normal mt-2">
                  <p>{exam.examinationsmoment}</p>
                  <p>{exam.hp}</p>
                </div>
              </section>

              {/* Footer with fixed position */}
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
  );
}