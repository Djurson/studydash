"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useMemo } from "react";
import { Examination, WithAuthProps } from "@/utils/types";
import { MapToChartsArray } from "@/utils/converters";

interface ChartData {
  date: string;
  credits: number;
}

// funktion för att generera nuvarande studieåret
function getCurrentStudyYear(startYear: number) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Om nuvarande månad är mindre än före augusti (månad 7 (börjar på 0)), dra av 1 från året
  const studyYear = currentMonth < 7 ? currentYear - 1 : currentYear;

  return {
    current: `${studyYear} - ${studyYear + 1}`,
    start: new Date(studyYear, 7, 1),
    end: new Date(studyYear + 1, 6, 31),
  };
}

// funktion för att generera alla studieår från ett startår för att kunna mappa i select dropdownen och visa timeframe
function getAllStudyYears(startYear: number) {
  const now = new Date();
  const curretYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const years = [];
  const endYear = currentMonth >= 7 ? curretYear : curretYear - 1;

  for (let year = startYear; year <= endYear; year++) {
    years.push({
      year: `${year} - ${year + 1}`,
      start: new Date(year, 7, 1),
      end: new Date(year + 1, 7, 0),
      counter: year - startYear,
    });
  }

  return years;
}

// funktion för att visa det korrekta månads och års timefrmen som datan visar
function formatedTimeRange(range: string, startYear: number): string {
  const now = new Date();

  if (range === "90d") {
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 90);
    return `${startDate.toLocaleDateString("sv-SE", { month: "long" })} ${startDate.getFullYear()} - ${now.toLocaleDateString("sv-SE", { month: "long" })} ${now.getFullYear()}`;
  } else if (range === "180d") {
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 180);
    return `${startDate.toLocaleDateString("sv-SE", { month: "long" })} ${startDate.getFullYear()} - ${now.toLocaleDateString("sv-SE", { month: "long" })} ${now.getFullYear()}`;
  } else if (range === "Alla") {
    return ` augusti ${startYear} - nu`;
  } else {
    const [startYear, endYear] = range.split(" - ").map(Number);
    return ` augusti ${startYear} - juli ${endYear}`;
  }
}

const chartConfig = {
  credits: {
    label: "credits",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Credits({ userData }: Partial<WithAuthProps>) {
  // const startYear = Number(userData?.studyyear);
  const startYear = Number.parseInt(userData?.studyyear ?? "2022");
  const studyYears = getAllStudyYears(startYear);
  const currentStudyYear = getCurrentStudyYear(startYear);
  const [timeRange, setTimeRange] = useState<string>(currentStudyYear.current);

  // Använda detta istället för hårdkodad data, behöver bara att den ändrar startDate och endDate beroende på vad användaren väljer
  //const [timePeriod, setTimePeriod] = useState({ startDate: "0", endDate: "0" });
  //const cartData = MapToChartsArray(userData?.sortedDateMap ?? new Map<number, Examination[]>(), Number.parseInt(timePeriod.startDate), Number.parseInt(timePeriod.endDate));

  console.log(userData?.sortedDateMap);

  const allChartData = useMemo(() => {
    const data: ChartData[] = [];

    const exams: Examination[] = [];
    userData?.sortedDateMap?.forEach((examArray) => {
      exams.push(...examArray);
    });

    exams.forEach((exam) => {
      // formatera datumet till YYYY-MM-DD
      const formattedDate = `${exam.date.slice(0, 4)}-${exam.date.slice(4, 6)}-${exam.date.slice(6, 8)}`;
      data.push({
        date: formattedDate,
        credits: exam.hp,
      });
    });

    // returnera sorterade examinations datumen i stigande ordning
    return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [userData?.sortedDateMap]);

  const filteredData = useMemo(() => {
    return allChartData.filter((item) => {
      const date = new Date(item.date);

      if (timeRange === "90d") {
        const referenceDate = new Date();
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - 90);
        return date >= startDate;
      } else if (timeRange === "180d") {
        const referenceDate = new Date();
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - 180);
        return date >= startDate;
      } else if (timeRange === "Alla") {
        return true;
      } else {
        const selectedYear = studyYears.find((year) => year.year === timeRange);
        if (selectedYear) {
          return date >= selectedYear.start && date <= selectedYear.end;
        }
        return false;
      }
    });
  }, [allChartData, timeRange, studyYears]);

  const totalCredits = useMemo(() => {
    return filteredData.reduce((total, item) => total + item.credits, 0);
  }, [filteredData]);

  return (
    <main>
      <header className="py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground"> {formatedTimeRange(timeRange, startYear)}</p>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[10rem] rounded-lg sm:ml-auto cursor-pointer" aria-label="Select a value">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                3 månader
              </SelectItem>
              <SelectItem value="180d" className="rounded-lg">
                6 månader
              </SelectItem>
              {studyYears.map((studyYear) => (
                <SelectItem key={studyYear.year} value={studyYear.year} className="rounded-lg">
                  Årskurs {studyYear.counter + 1}
                </SelectItem>
              ))}
              <SelectItem value="Alla" className="rounded-lg">
                Alla
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span className="text-3xl font-semibold flex items-end gap-2">
          {totalCredits}
          <p className="text-sm text-muted-foreground font-normal text-end"> totalt</p>
        </span>
      </header>

      <section className="">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCredits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-blue-900)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-blue-900)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("sv-SE", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <YAxis width={40} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value} hp`} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("sv-SE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />

            <Area dataKey="credits" type="natural" fill="url(#fillCredits)" stroke="var(--color-blue-900)" stackId="a" strokeWidth={1.5} />
          </AreaChart>
        </ChartContainer>
      </section>
    </main>
  );
}
