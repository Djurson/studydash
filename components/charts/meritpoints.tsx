"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
const chartData = [
  {
    timefray: "all",
    treor: 5,
    fyror: 8,
    femmor: 10,
  },
];

//5
//8
//10

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

export function MeritPoints() {
  const totalVisitors = ((chartData[0].treor * 3 + chartData[0].fyror * 4 + chartData[0].femmor * 5) / (chartData[0].treor + chartData[0].fyror + chartData[0].femmor)).toFixed(2);

  return (
    <main className="flex flex-col aspect-square w-full h-full pt-4">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px] flex items-center z-[10]">
        <RadialBarChart data={chartData} endAngle={180} innerRadius="88%" outerRadius="140%" startAngle={0} cx="50%" cy="50%">
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-foreground text-2xl font-bold">
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground">
                        merit
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar dataKey="femmor" fill="var(--color-green-900)" stackId="stack" cornerRadius={5} className="stroke-transparent stroke-2" />
          <RadialBar dataKey="fyror" fill="var(--color-yellow-900)" stackId="stack" cornerRadius={5} className="stroke-transparent stroke-2" />
          <RadialBar dataKey="treor" stackId="stack" cornerRadius={5} fill="var(--color-red-900)" className="stroke-transparent stroke-2" />
        </RadialBarChart>
      </ChartContainer>

      <footer className="flex justify-between items-center transform -translate-y-16 text-muted-foreground ">
        <div className="flex gap-2 text-xs items-center">
          <div className="w-2.5 aspect-square rounded-xs bg-red-900"></div>
          <p>treor</p>
        </div>
        <div className="flex gap-2 text-xs items-center">
          <div className="w-2.5 aspect-square rounded-xs bg-yellow-900"></div>
          <p>fyror</p>
        </div>
        <div className="flex gap-2 text-xs items-center">
          <div className="w-2.5 aspect-square rounded-xs bg-green-900"></div>
          <p>femmor</p>
        </div>
      </footer>
    </main>
  );
}
