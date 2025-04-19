"use client";

import { useRef, useEffect, useState } from "react";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [{ timeframe: "År 2", credits: 26, fill: "var(--color-blue-900)" }];

const chartConfig = {
  credits: {
    label: "hp",
  },
  timeframe: {
    label: "År 2",
    color: "hsl(var(--color-background))",
  },
} satisfies ChartConfig;

export function StudyFunds() {
  // TODO: hantera ifall man har mer intjänat hp än kravet på 45

  //Räkna ut graderna där radiallinjerna ska vara med avseende på hp
  // TODO: hantera uträkning för om kravet är på 45 hp eller 37.5 hp
  const endingAngle = (chartData[0].credits / 45) * 360;

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
    <main className="flex items-center justify-center aspect-square w-full h-full" ref={mainRef}>
      <ChartContainer config={chartConfig} className=" w-full h-full transform -translate-y-2.5">
        <RadialBarChart data={chartData} startAngle={0} endAngle={endingAngle} innerRadius="76%" outerRadius="126%">
          <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-background last:fill-card" polarRadius={[containerSize * 0.4, containerSize * 0.31]} />
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
