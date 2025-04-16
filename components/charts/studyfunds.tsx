"use client";

import { useRef, useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [{ type: "studydunds", credits: 26, fill: "var(--color-blue-900)" }];

const chartConfig = {
  credits: {
    label: "hp",
  },
  type: {
    label: "studyfunds",
    color: "hsl(var(--color-background))",
  },
} satisfies ChartConfig;

export function StudyFunds() {
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
      <ChartContainer config={chartConfig} className=" w-full h-full transform -translate-y-2.5">
        <RadialBarChart data={chartData} startAngle={0} endAngle={250} innerRadius="77%" outerRadius="125.5%">
          <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-background last:fill-card" polarRadius={[containerSize * 0.41, containerSize * 0.32]} />
          <RadialBar dataKey="credits" cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                        {chartData[0].credits.toLocaleString()}
                        <tspan dx={5} className="fill-muted-foreground text-xs font-normal">
                          /45
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
