"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart";

const chartData = [
  { date: "2022-08-01", hp: 0 },
  { date: "2022-10-17", hp: 3 },
  { date: "2022-10-25", hp: 6 },
  { date: "2022-10-26", hp: 2 },
  { date: "2022-10-30", hp: 3 },
  { date: "2022-12-17", hp: 4 },
  { date: "2022-12-22", hp: 3 },
  { date: "2023-01-10", hp: 6 },
  { date: "2023-02-10", hp: 1 },
  { date: "2023-03-19", hp: 1 },
  { date: "2023-03-22", hp: 3 },
  { date: "2023-04-12", hp: 3 },
  { date: "2023-05-07", hp: 1 },
  { date: "2023-05-26", hp: 2 },
  { date: "2023-06-06", hp: 3 },
  { date: "2023-09-01", hp: 1 },
  { date: "2023-09-01", hp: 1 },
  { date: "2023-10-16", hp: 1 },
  { date: "2023-10-28", hp: 6 },
  { date: "2023-10-30", hp: 2 },
  { date: "2023-11-24", hp: 1 },
  { date: "2023-12-18", hp: 1 },
  { date: "2023-12-20", hp: 7 },
  { date: "2024-01-03", hp: 4 },
  { date: "2024-01-08", hp: 6 },
  { date: "2024-01-10", hp: 3 },
  { date: "2024-02-29", hp: 1 },
  { date: "2024-03-05", hp: 1.5 },
  { date: "2024-03-06", hp: 1 },
  { date: "2024-03-07", hp: 1.5 },
  { date: "2024-03-18", hp: 6 },
  { date: "2024-03-22", hp: 4 },
  { date: "2024-03-23", hp: 4.5 },
  { date: "2024-05-30", hp: 6 },
  { date: "2024-05-31", hp: 6 },
  { date: "2024-06-18", hp: 2 },
  { date: "2024-07-08", hp: 3 },
  { date: "2024-10-21", hp: 1.5 },
  { date: "2024-10-24", hp: 3 },
  { date: "2024-10-25", hp: 4.5 },
  { date: "2024-10-29", hp: 3 },
  { date: "2024-12-17", hp: 0.5 },
  { date: "2024-12-19", hp: 1.5 },
  { date: "2024-12-21", hp: 1.5 },
  { date: "2025-01-17", hp: 4 },
];

const chartConfig = {
  hp: {
    label: "Högskolepoäng: ",
    color: "hsl(var(--color-blue-900))",
  },
} satisfies ChartConfig;

export default function ChartLanding() {
  return (
    <Card className="w-full h-full hover:scale-102 transition duration-300 ease-in-out z-10">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Högskolepoäng</CardTitle>
          <CardDescription>Augusti 2022 - 2025</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-blue-900)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-blue-900)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
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
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("sv-SE", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="hp" fill="url(#fillMobile)" type="natural" stroke="var(--color-blue-300)" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
