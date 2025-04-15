"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"


const allChartData = [
  // Årskurs 1 (2022-2023)
  { date: "2022-08-15", hp: 10, year: 1 },
  { date: "2022-09-01", hp: 3, year: 1 }, 
  { date: "2022-10-20", hp: 7.5, year: 1 },
  { date: "2022-11-01", hp: 5, year: 1 },   
  { date: "2022-11-25", hp: 4, year: 1 },  
  { date: "2022-12-15", hp: 1, year: 1 },  
  { date: "2023-01-30", hp: 12, year: 1 },  
  
  // Årskurs 2 (2023-2024)
  { date: "2023-08-28", hp: 2, year: 2 },
  { date: "2023-09-15", hp: 3, year: 2 },
  { date: "2023-10-20", hp: 10, year: 2 },
  { date: "2023-11-15", hp: 8, year: 2 },  
  { date: "2023-12-20", hp: 14, year: 2 },
  
  // Årskurs 3 (2024-2025)
  { date: "2024-08-26", hp: 1.5, year: 3 },
  { date: "2024-09-20", hp: 5, year: 3 },
  { date: "2024-10-25", hp: 4, year: 3 },  
  { date: "2024-11-30", hp: 13, year: 3 },
  { date: "2024-12-20", hp: 15, year: 3 }
]

const chartConfig = {
    hp: {
        label: "Högskolepoäng",
        color: "hsl(var(--color-blue-900))",
    }
} satisfies ChartConfig

export function ChartLanding() {
    const [selectedYear, setSelectedYear] = useState<number>(1)
    const filteredData = allChartData.filter(item => item.year === selectedYear)
    
    return (
        <div className="h-full">
            <ChartContainer
                config={chartConfig}
                className="h-[calc(100%-2rem)] w-full"
            >
                {/* Header with year selector */}
                <div className="flex justify-between items-center mb-4 px-4 pt-2">
                    <div>
                        <h3 className="text-lg font-semibold">Högskolepoäng</h3>
                        <p className="text-sm text-muted-foreground">
                            Årskurs {selectedYear} ({selectedYear + 2021}/{selectedYear + 2022})
                        </p>
                    </div>
                    <Select 
                        value={selectedYear.toString()}
                        onValueChange={(value) => setSelectedYear(parseInt(value))}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={`Årskurs ${selectedYear}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {[1, 2, 3].map(year => (
                                <SelectItem key={year} value={year.toString()}>
                                    Årskurs {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                {/* Area Chart with proper gradient */}
                <AreaChart 
                    data={filteredData} 
                    margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                >
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-blue-500)" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="var(--color-blue-500)" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                        tickMargin={8}
                        tickFormatter={(value) => new Date(value).toLocaleDateString("sv-SE", { month: "short", day: "numeric" })}
                    />
                    <YAxis
                        width={40}
                        tickLine={false}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                        tickMargin={8}
                        tickFormatter={(value) => `${value}hp`}
                        domain={[0, 15]}
                    />
                    
                    <ChartTooltip
                        cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
                        content={
                            <ChartTooltipContent
                                labelFormatter={(value) => new Date(value).toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" })}
                                formatter={(value) => [`${value} HP`, "Poäng"]}
                                indicator="dot"
                            />
                        }
                    />
                    
                    <Area
                        dataKey="hp"
                        fill="url(#areaGradient)"
                        type="monotone"
                        stroke="var(--color-blue-700)"
                        strokeWidth={2.5}
                        fillOpacity={0.4}
                        activeDot={{ 
                            r: 5, 
                            stroke: "var(--color-blue-700)", 
                            fill: "white", 
                            strokeWidth: 2 
                        }}
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    )
}