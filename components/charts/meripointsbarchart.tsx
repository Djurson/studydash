"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Rectangle } from "recharts";
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

const CustomBar = (props: any) => {
  const { fill, x, y, width, height, isTop } = props;
  const radius = isTop ? 4 : 0;

  return <Rectangle x={x} y={y} width={width} height={height} fill={fill} radius={isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]} />;
};

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

  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No grade data available</p>
      </div>
    );
  }

  return (
    <main className="w-full">
      <header>
        <p className="text-sm text-muted-foreground mt-2"> Visar data från {userData?.studyyear} - nu</p>
      </header>
      <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full mt-10">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              const [month, year] = value.split(" ");
              return `${month.slice(0, 3)} ${year}`;
            }}
          />
          <YAxis width={40} tickLine={false} axisLine={false} allowDecimals={false} tickMargin={8} />
          <ChartTooltip
            cursor={true}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  const [month, year] = value.split(" ");
                  return `${month.slice(0, 3)} ${year}`;
                }}
                indicator="dot"
              />
            }
          />

          <Bar
            dataKey="treor"
            stackId="a"
            fill="var(--color-red-900)"
            shape={(props: any) => {
              const entry = chartData.find((d) => d.name === props.name);
              return <CustomBar {...props} isTop={!entry?.fyror && !entry?.femmor} />;
            }}
          />
          <Bar
            dataKey="fyror"
            stackId="a"
            fill="var(--color-yellow-900)"
            shape={(props: any) => {
              const entry = chartData.find((d) => d.name === props.name);
              return <CustomBar {...props} isTop={!entry?.femmor} />;
            }}
          />
          <Bar dataKey="femmor" stackId="a" fill="var(--color-green-900)" shape={(props: any) => <CustomBar {...props} isTop={true} />} />
        </BarChart>
      </ChartContainer>
    </main>
  );
}
