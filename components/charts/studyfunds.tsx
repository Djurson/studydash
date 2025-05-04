"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Examination, WithAuthProps } from "@/utils/types";
import { Check } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

//const chartData = [{ timeframe: "År 2", credits: 26 /*fill: "var(--color-blue-900)" */ }];

const chartConfig = {
  credits: {
    label: "hp",
  },
  timeframe: {
    label: "",
    color: "hsl(var(--color-background))",
  },
} satisfies ChartConfig;

// Funktionen bör läggas i separat js fil, den förekommer i flera komponenter
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

// Funktion för att ta ut ett studieårs range
function getStudyYearRange(yearString: string) {
  const year = parseInt(yearString);
  return {
    start: new Date(year, 7, 1),
    end: new Date(year + 1, 6, 31),
  };
}

function getStudyYearNumber(startYear: number, currentYear: string) {
  const year = parseInt(currentYear.split(" - ")[0]);
  return year - startYear + 1;
}

export function StudyFunds({ userData }: Partial<WithAuthProps>) {
  const startYear = Number.parseInt(userData?.studyyear ?? "2022");
  const currentStudyYear = getCurrentStudyYear();
  const studyYearNumber = getStudyYearNumber(startYear, currentStudyYear.current);

  //Räkna ut hp beserat på tidigare sökt csn
  const requiredCredits = useMemo(() => {
    return studyYearNumber === 1 && !userData?.previousfunds ? 37.5 : 45;
  }, [studyYearNumber, userData?.previousfunds]);

  // rangen för nuvarande stuideår
  const dateRange = useMemo(() => {
    const { start, end } = getStudyYearRange(currentStudyYear.current.split(" - ")[0]);
    return {
      startDate: start,
      endDate: end,
    };
  }, [currentStudyYear]);

  //hämta hp
  const chartData = useMemo(() => {
    if (!userData?.sortedDateMap) return [{ timeframe: `År ${studyYearNumber}`, credits: 0 }];

    // konvertera Map entries till en array av examinations under tids rangen
    const exams: Examination[] = [];
    userData.sortedDateMap.forEach((examArray, yearMonth) => {
      const examDate = new Date(parseInt(yearMonth.toString().slice(0, 4)), parseInt(yearMonth.toString().slice(4, 6)) - 1, 1);

      if (examDate >= dateRange.startDate && examDate <= dateRange.endDate) {
        exams.push(...examArray);
      }
    });

    const totalCredits = exams.reduce((sum, exam) => sum + exam.hp, 0);

    return [
      {
        timeframe: `År ${studyYearNumber}`,
        credits: totalCredits,
      },
    ];
  }, [userData?.sortedDateMap, dateRange, studyYearNumber]);

  //Räkna ut graderna där radiallinjerna ska vara med avseende på hp
  //const endingAngle = (chartData[0].credits / 45) * 360;
  const endingAngle = useMemo(() => {
    return Math.min((chartData[0].credits / requiredCredits) * 360, 360);
  }, [chartData, requiredCredits]);

  //Räkna ut bredden på main taggen för att polarRadius kan vara responsiv (den tillåter bara pixelvärden)
  const mainRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(0);

  useEffect(() => {
    if (!mainRef.current) return;

    const updateSize = () => {
      const width = mainRef.current?.clientWidth || 0;
      setContainerSize(width);
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(mainRef.current);
    return () => resizeObserver.disconnect();
  }, []);
  return (
    <main className="flex items-center justify-center aspect-square w-full h-full relative" ref={mainRef}>
      {endingAngle >= 360 ? (
        <div className="absolute z-10 left-0 top-2">
          <Check color="var(--color-green-900)" className="h-7 w-7" />
        </div>
      ) : (
        ""
      )}

      <ChartContainer config={chartConfig} className=" w-full h-full transform -translate-y-2.5">
        <RadialBarChart data={chartData} startAngle={0} endAngle={endingAngle} innerRadius="76%" outerRadius="126%">
          <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-background last:fill-card bg-amber-600" polarRadius={[containerSize * 0.4, containerSize * 0.31]} />
          <RadialBar dataKey="credits" cornerRadius={10} fill={endingAngle >= 360 ? "var(--color-green-900)" : "var(--color-blue-900)"} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                        {chartData[0].credits.toLocaleString()}
                        <tspan dx={5} className="fill-muted-foreground text-xs font-normal">
                          /{requiredCredits}
                        </tspan>
                      </tspan>

                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs">
                        hp
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </main>
  );
}
