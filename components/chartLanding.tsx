"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"

const allChartData = [
    { date: "2022-08-15", hp: 10, year: 1, status: "completed" },
    { date: "2022-09-01", hp: 3, year: 1, status: "pending" },
    { date: "2022-10-20", hp: 7.5, year: 1, status: "completed" },
    { date: "2022-11-01", hp: 5, year: 1, status: "pending" },
    { date: "2022-11-25", hp: 4, year: 1, status: "pending" },
    { date: "2022-12-15", hp: 1, year: 1, status: "completed" },
    { date: "2023-01-30", hp: 12, year: 1, status: "completed" },
  
    { date: "2023-08-28", hp: 2, year: 2, status: "pending" },
    { date: "2023-09-15", hp: 3, year: 2, status: "completed" },
    { date: "2023-10-20", hp: 10, year: 2, status: "completed" },
    { date: "2023-11-15", hp: 8, year: 2, status: "pending" },
    { date: "2023-12-20", hp: 14, year: 2, status: "completed" },
  
    { date: "2024-08-26", hp: 1.5, year: 3, status: "pending" },
    { date: "2024-09-20", hp: 5, year: 3, status: "completed" },
    { date: "2024-10-25", hp: 4, year: 3, status: "pending" },
    { date: "2024-11-30", hp: 13, year: 3, status: "completed" },
    { date: "2024-12-20", hp: 15, year: 3, status: "completed" }
]

const stats = {
    Avklarade: "26",
    Total: "32",
    Släpande: "6"
}

export function ChartLanding() {
  const [selectedYear, setSelectedYear] = useState<number>(1)
  const filteredData = allChartData.filter(item => item.year === selectedYear)

  const getDateRange = () => {
    const dates = filteredData.map(item => new Date(item.date))
    const startDate = dates[0]
    const endDate = dates[dates.length - 1]
    
    return {
      start: startDate.toLocaleDateString("sv-SE", { year: 'numeric', month: 'short' }),
      end: endDate.toLocaleDateString("sv-SE", { year: 'numeric', month: 'short' })
    }
  }

  const dateRange = getDateRange()

  return (
    <div className="w-full h-full p-4">
      <div className="flex justify-between mb-2">
        <div>
          <p className="text-sm text-muted-foreground">
            {dateRange.start} - {dateRange.end}
          </p>
        </div>
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(parseInt(value))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
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

    
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-2xl font-bold">{stats.Total} hp</p>
          <p className="text-sm text-muted-foreground">Totalt</p> 
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.Avklarade} hp</p> 
          <p className="text-sm text-muted-foreground">Avklarade</p>   
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.Släpande} hp</p>
          <p className="text-sm text-muted-foreground">Släpande</p>         
        </div>
      </div>

      <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="40%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          
            <XAxis
              dataKey="date"
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("sv-SE", {
                  month: "short",
                  day: "numeric"
                })
              }
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              width={30} 
              tickMargin={5}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              formatter={(value: any) => [`${value} hp`, "Poäng"]}
              labelFormatter={(date) => 
                new Date(date).toLocaleDateString("sv-SE", {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }
            />
            <Area
              type="monotone"
              dataKey="hp"
              stroke="#0071e3"
              strokeWidth={3}
              fill="url(#areaGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}