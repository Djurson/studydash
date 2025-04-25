"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { WithAuthProps } from "@/utils/types";
import { useMemo } from "react";

const chartConfig = {
  treor: {
    label: "treor",
    color: "var(--color-red-900)",
  },
  fyror: {
    label: "fyror",
    color: "var(--color-yellow-900)",
  },
  femmor: {
    label: "femmor",
    color: "var(--color-green-900)",
  },
} satisfies ChartConfig;
//innerRadius={80} outerRadius={130}

export function MeritPointsBarChart({ userData }: Partial<WithAuthProps>) {
  const allCourses = useMemo(() => {
    const courses: {
      date: Date;
      grade: number;
      code: string;
    }[] = [];

    userData?.meritGradeMap?.forEach((coursesForGrade, grade) => {
      coursesForGrade.forEach((course) => {
        courses.push({
          date: new Date(parseInt(course.date.slice(0, 4)), parseInt(course.date.slice(4, 6)) - 1, parseInt(course.date.slice(6, 8))),
          grade,
          code: course.code,
        });
      });
    });

    return courses.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [userData?.meritGradeMap]);

  const chartData = useMemo(() => {
    if (!allCourses.length || !userData?.studyyear) return [];

    const startYear = parseInt(userData.studyyear);
    const startDate = new Date(startYear, 7, 1);
    const endDate = new Date();

    const monthlyData: Record<
      string,
      {
        treor: number;
        fyror: number;
        femmor: number;
        monthKey: string;
      }
    > = {};

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
      monthlyData[monthKey] = {
        treor: 0,
        fyror: 0,
        femmor: 0,
        monthKey,
      };
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    allCourses.forEach((course) => {
      const monthKey = `${course.date.getFullYear()}-${String(course.date.getMonth() + 1).padStart(2, "0")}`;
      if (monthlyData[monthKey]) {
        if (course.grade === 3) monthlyData[monthKey].treor++;
        if (course.grade === 4) monthlyData[monthKey].fyror++;
        if (course.grade === 5) monthlyData[monthKey].femmor++;
      }
    });

    return Object.values(monthlyData)
      .filter((month) => month.treor > 0 || month.fyror > 0 || month.femmor > 0)
      .map((month) => ({
        ...month,
        name: new Date(month.monthKey).toLocaleDateString("sv-SE", {
          month: "short",
          year: "2-digit",
        }),
        total: month.treor + month.fyror + month.femmor,
      }));
  }, [allCourses, userData?.studyyear]);

  console.log("userdata", userData);

  //const merit = ((chartData[0].treor * 3 + chartData[0].fyror * 4 + chartData[0].femmor * 5) / (chartData[0].treor + chartData[0].fyror + chartData[0].femmor)).toFixed(2);
  return (
    <main className="flex flex-col aspect-square h-[500px] w-full w-max-[500px] pt-4">
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData}>
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
          <YAxis width={40} tickLine={false} axisLine={false} allowDecimals={false} tickMargin={8} tickFormatter={(value) => `${value} betyg`} />
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
          <Bar dataKey="treor" stackId="a" fill="var(--color-red-900)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="fyror" stackId="a" fill="var(--color-yellow-900)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="femmor" stackId="a" fill="var(--color-green-900)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </main>
  );
}
