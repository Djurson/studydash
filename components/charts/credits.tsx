"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { UserData, WithAuthProps } from "@/utils/types";

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
  let yearsCount = 0;

  for (let year = startYear; year <= endYear; year++) {
    years.push({
      year: `${year} - ${year + 1}`,
      start: new Date(year, 7, 1),
      end: new Date(year + 1, 7, 0),
      counter: yearsCount++,
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

//funktion för att summera hp
function calculateTotalCredits(filteredData: Array<{ credits: number }>): number {
  return filteredData.reduce((total, item) => total + item.credits, 0);
}

// datum för hp är inte sorterade i stigande ordning i databasen,
// TODO: göra en funktion för att sortera datumen i stigande ordning

// Prop data:

const submoduleCreditsData = [
  { date: "2022-10-07", credits: 2.0 },
  { date: "2022-10-18", credits: 1.5 },
  { date: "2022-10-25", credits: 1.0 },
  { date: "2022-10-26", credits: 4.5 },
  { date: "2022-12-14", credits: 2.0 },
  { date: "2023-01-10", credits: 6.0 },
  { date: "2023-01-12", credits: 3.0 },
  { date: "2023-01-13", credits: 1.0 },
  { date: "2023-01-25", credits: 3.0 },
  { date: "2023-01-28", credits: 3.0 },
  { date: "2023-02-10", credits: 1.0 },
  { date: "2023-03-16", credits: 3.0 },
  { date: "2023-03-19", credits: 1.0 },
  { date: "2023-03-20", credits: 6.0 },
  { date: "2023-03-22", credits: 3.0 },
  { date: "2023-05-07", credits: 1.0 },
  { date: "2023-05-07", credits: 0.5 },
  { date: "2023-05-07", credits: 0.5 },
  { date: "2023-05-26", credits: 2.0 },
  { date: "2023-06-01", credits: 6.0 },
  { date: "2023-06-02", credits: 3.0 },
  { date: "2023-06-07", credits: 3.0 },
  { date: "2023-08-31", credits: 1.0 },
  { date: "2023-10-16", credits: 1.0 },
  { date: "2023-10-24", credits: 4.0 },
  { date: "2023-10-28", credits: 6.0 },
  { date: "2023-10-30", credits: 2.0 },
  { date: "2023-11-20", credits: 1.0 },
  { date: "2023-12-20", credits: 3.0 },
  { date: "2023-12-20", credits: 3.0 },
  { date: "2024-01-08", credits: 6.0 },
  { date: "2024-01-10", credits: 3.0 },
  { date: "2024-03-04", credits: 1.0 },
  { date: "2024-03-05", credits: 1.5 },
  { date: "2024-03-07", credits: 1.5 },
  { date: "2024-03-22", credits: 4.0 },
  { date: "2024-03-23", credits: 4.5 },
  { date: "2024-03-28", credits: 0.5 },
  { date: "2024-03-28", credits: 0.5 },
  { date: "2024-04-25", credits: 2.0 },
  { date: "2024-05-29", credits: 2.0 },
  { date: "2024-05-31", credits: 6.0 },
  { date: "2024-06-01", credits: 1.5 },
  { date: "2024-06-18", credits: 2.0 },
  { date: "2024-07-08", credits: 3.0 },
  { date: "2024-10-21", credits: 1.5 },
  { date: "2024-10-24", credits: 1.5 },
  { date: "2024-10-24", credits: 1.5 },
  { date: "2024-10-25", credits: 4.5 },
  { date: "2024-10-29", credits: 3.0 },
  { date: "2024-12-17", credits: 0.5 },
  { date: "2024-12-19", credits: 0.5 },
  { date: "2024-12-19", credits: 1.0 },
  { date: "2024-12-21", credits: 1.5 },
  { date: "2025-01-13", credits: 4.5 },
  { date: "2025-01-17", credits: 4.0 },
  { date: "2025-01-19", credits: 6.0 },
  { date: "2025-03-27", credits: 2.0 },
  { date: "2025-03-31", credits: 3.5 },
  { date: "2025-03-31", credits: 0.5 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  credits: {
    label: "credits",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Credits({ user, userData }: WithAuthProps) {
  // läsa in startdatum från databasen (exempelvis 2022) och ta året och lägga till 08-01
  const startYear = 2022; // hårdkodat för tillfället
  const studyYears = getAllStudyYears(startYear);
  const currentStudyYear = getCurrentStudyYear(startYear);

  const [timeRange, setTimeRange] = useState<string>(currentStudyYear.current);

  const filteredData = submoduleCreditsData.filter((item) => {
    const date = new Date(item.date);
    const credits = item.credits;

    if (timeRange === "90d") {
      const refferenceDate = new Date();
      const startDate = new Date(refferenceDate);
      startDate.setDate(startDate.getDate() - 90);
      return date >= startDate;
    } else if (timeRange === "180d") {
      const refferenceDate = new Date();
      const startDate = new Date(refferenceDate);
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
          {calculateTotalCredits(filteredData)}
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
