"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useMemo } from "react";
import { Examination, WithAuthProps } from "@/utils/types";
import { ChartColumn, ChartSpline } from "lucide-react";

interface ChartData {
  date: string;
  credits: number;
}

// funktion för att generera nuvarande studieåret
function getCurrentStudyYear() {
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
    //return `${startDate.toLocaleDateString("sv-SE", { month: "long" })} ${startDate.getFullYear()} - ${now.toLocaleDateString("sv-SE", { month: "long" })} ${now.getFullYear()}`;
    return `${startDate.toLocaleDateString("sv-SE", { month: "long" })} ${startDate.getFullYear()} - nu`;
  } else if (range === "180d") {
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 180);
    //return `${startDate.toLocaleDateString("sv-SE", { month: "long" })} ${startDate.getFullYear()} - ${now.toLocaleDateString("sv-SE", { month: "long" })} ${now.getFullYear()}`;
    return `${startDate.toLocaleDateString("sv-SE", { month: "long" })} ${startDate.getFullYear()} - nu`;
  } else if (range === "Alla") {
    return ` augusti ${startYear} - nu`;
  } else {
    const [startYear, endYear] = range.split(" - ").map(Number);
    const currentEndDate = new Date(endYear, 6, 31);
    if (currentEndDate > now) {
      return ` augusti ${startYear} - nu`;
    } else {
      return ` augusti ${startYear} - juli ${endYear}`;
    }
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
  const currentStudyYear = getCurrentStudyYear();
  const [timeRange, setTimeRange] = useState<string>(currentStudyYear.current);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  // Använda detta istället för hårdkodad data, behöver bara att den ändrar startDate och endDate beroende på vad användaren väljer
  //const [timePeriod, setTimePeriod] = useState({ startDate: "0", endDate: "0" });
  //const cartData = MapToChartsArray(userData?.sortedDateMap ?? new Map<number, Examination[]>(), Number.parseInt(timePeriod.startDate), Number.parseInt(timePeriod.endDate));

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

  // fixa om data formatet till stapeldiagrammet
  const barChartData = useMemo(() => {
    const monthMap = new Map<string, number>();

    filteredData.forEach((item) => {
      const date = new Date(item.date);
      const monthYear = date.toLocaleDateString("sv-SE", {
        month: "long",
        year: "numeric",
      });

      const current = monthMap.get(monthYear) || 0;
      monthMap.set(monthYear, current + item.credits);
    });

    return Array.from(monthMap.entries())
      .map(([month, credits]) => ({
        month,
        credits,
      }))
      .sort((a, b) => {
        const dateA = new Date(`1 ${a.month}`);
        const dateB = new Date(`1 ${b.month}`);
        return dateA.getTime() - dateB.getTime();
      });
  }, [filteredData]);

  const totalCredits = useMemo(() => {
    return filteredData.reduce((total, item) => total + item.credits, 0);
  }, [filteredData]);

  return (
    <main>
      <header className="py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground"> {formatedTimeRange(timeRange, startYear)}</p>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[8rem] rounded-lg sm:ml-auto cursor-pointer" aria-label="Select a value">
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

        <span className="text-3xl font-semibold flex justify-between">
          <div className="flex items-end gap-2">
            {totalCredits}
            <p className="text-sm text-muted-foreground font-normal text-end"> totalt</p>
          </div>
          <button onClick={() => setChartType(chartType === "line" ? "bar" : "line")} className="p-1.5 rounded-sm bg-card hover:bg-background cursor-pointer flex items-center">
            {chartType === "line" ? <ChartColumn /> : <ChartSpline />}
          </button>
        </span>
      </header>

      <section className="">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          {chartType === "line" ? (
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

              <YAxis width={40} tickLine={false} axisLine={false} allowDecimals={false} tickMargin={8} tickFormatter={(value) => `${value} hp`} />
              <ChartTooltip
                cursor={true}
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

              <Area dataKey="credits" type="natural" fill="url(#fillCredits)" stroke="var(--color-blue-900)" stackId="a" strokeWidth={2} />
            </AreaChart>
          ) : (
            <BarChart data={barChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const [month, year] = value.split(" ");
                  return `${month.slice(0, 3)} ${year}`;
                }}
              />
              <YAxis width={40} tickLine={false} axisLine={false} allowDecimals={false} tickMargin={8} tickFormatter={(value) => `${value} hp`} />
              <ChartTooltip
                cursor={true}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      const [month, year] = value.split(" ");
                      return `${month.slice(0, 3)} ${year}`;
                      /* return new Date(value).toLocaleDateString("sv-SE", {
                        year: "numeric",
                        month: "short",
                      }); */
                    }}
                    indicator="dot"
                  />
                }
              />
              <Bar dataKey="credits" fill="var(--color-blue-900)" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ChartContainer>
      </section>
    </main>
  );
}
