"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"

// Complete fake data organized by årskurs (academic year)
const allChartData = [
  // Årskurs 1 (2022-2023)
  { date: "2022-08-15", hp: 0, year: 1 },
  { date: "2022-09-05", hp: 7.5, year: 1 },
  { date: "2022-10-17", hp: 15, year: 1 },
  { date: "2022-11-14", hp: 22.5, year: 1 },
  { date: "2023-01-10", hp: 30, year: 1 },
  { date: "2023-03-15", hp: 45, year: 1 },
  { date: "2023-05-20", hp: 60, year: 1 },
  
  // Årskurs 2 (2023-2024)
  { date: "2023-08-28", hp: 60, year: 2 },
  { date: "2023-09-18", hp: 67.5, year: 2 },
  { date: "2023-10-23", hp: 75, year: 2 },
  { date: "2023-11-27", hp: 82.5, year: 2 },
  { date: "2024-01-15", hp: 90, year: 2 },
  { date: "2024-03-12", hp: 105, year: 2 },
  { date: "2024-05-21", hp: 120, year: 2 },
  
  // Årskurs 3 (2024-2025)
  { date: "2024-08-26", hp: 120, year: 3 },
  { date: "2024-09-16", hp: 127.5, year: 3 },
  { date: "2024-10-21", hp: 135, year: 3 },
  { date: "2024-11-25", hp: 142.5, year: 3 },
  { date: "2025-01-13", hp: 150, year: 3 },
  { date: "2025-03-10", hp: 165, year: 3 },
  { date: "2025-05-19", hp: 180, year: 3 },
  
  // Årskurs 4 (2025-2026)
  { date: "2025-08-25", hp: 180, year: 4 },
  { date: "2025-09-15", hp: 187.5, year: 4 },
  { date: "2025-10-20", hp: 195, year: 4 },
  { date: "2025-11-24", hp: 202.5, year: 4 },
  { date: "2026-01-12", hp: 210, year: 4 },
  { date: "2026-03-09", hp: 225, year: 4 },
  { date: "2026-05-18", hp: 240, year: 4 },
  
  // Årskurs 5 (2026-2027)
  { date: "2026-08-24", hp: 240, year: 5 },
  { date: "2026-09-14", hp: 247.5, year: 5 },
  { date: "2026-10-19", hp: 255, year: 5 },
  { date: "2026-11-23", hp: 262.5, year: 5 },
  { date: "2027-01-11", hp: 270, year: 5 },
  { date: "2027-03-08", hp: 285, year: 5 },
  { date: "2027-05-17", hp: 300, year: 5 }
]
const chartConfig = {
    hp: {
        color: "hsl(var(--color-blue-900))",
    }
} satisfies ChartConfig

export function ChartLanding() {
    const [selectedYear, setSelectedYear] = useState<number>(1)
    
    // Filter data based on selected year
    const filteredData = allChartData.filter(item => item.year === selectedYear)
    
    return (
        <div className="h-full">
            <ChartContainer
                config={chartConfig}
                className="h-[calc(100%-2rem)] w-full"
            >
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">Högskolepoäng</h3>
                        <p className="text-sm text-muted-foreground">
                            Årskurs {selectedYear} - {selectedYear + 2021}/{selectedYear + 2022}
                        </p>
                    </div>
                    <Select 
                        value={selectedYear.toString()}
                        onValueChange={(value) => setSelectedYear(parseInt(value))}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Årskurs" />
                        </SelectTrigger>
                        <SelectContent>
                            {[1, 2, 3, 4, 5].map(year => (
                                <SelectItem key={year} value={year.toString()}>
                                    Årskurs {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <AreaChart data={filteredData}>
                    <defs>
                        <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-blue-900)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="var(--color-blue-900)" stopOpacity={0.1}/>
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
                            const date = new Date(value)
                            return date.toLocaleDateString("sv-SE", {
                                month: "short",
                                day: "numeric",
                            })
                        }}
                    />
                    <YAxis
                        width={40}
                        tickLine={true}
                        axisLine={true}
                        tickMargin={8}
                        tickFormatter={(value) => `${value}hp`}
                    />
                    <ChartTooltip
                        cursor={true}
                        content={
                            <ChartTooltipContent
                                labelFormatter={(value) => {
                                    return new Date(value).toLocaleDateString("sv-SE", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                                indicator="dot"
                            />
                        }
                    />
                    <Area
                        dataKey="hp"
                        fill="url(#fillMobile)"
                        type="natural"
                        stroke="var(--color-blue-900)"
                        strokeWidth={2}
                        stackId="a"
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    )
}