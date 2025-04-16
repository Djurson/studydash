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

interface ChartLandingProps {
  showYearSelector?: boolean
  showStats?: boolean
  showDateRange?: boolean
  customHeader?: React.ReactNode
  customStats?: {
    total: string | number
    completed: string | number
    pending: string | number
  }
  height?: number
  width?: string | number

}

export function ChartLanding({
  showYearSelector = true,
  showStats = true,
  showDateRange = true,
  customHeader,
  customStats,
  height = 250,
  width = "100%",
}: ChartLandingProps) {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')
  const filteredData = selectedYear === 'all' 
    ? allChartData 
    : allChartData.filter(item => item.year === selectedYear)

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
  const stats = customStats || {
    total: "32",
    completed: "26",
    pending: "6"
  }

/* kalla på den         <div className="mt-4 w-full">
  <Card cardTitle="">
    <div style={{ width: "100%", height: 300 }}>
      <ChartLanding height={300} width="100%" showStats={false} />
    </div>
  </Card>
</div> för att få hela grafen */

  return (
    <div className="p-4" style={{ width, height }}>
      {customHeader ? (
        customHeader
      ) : (
        <div className="flex justify-between mb-2">
          {showDateRange && (
            <div>
              <p className="text-sm text-muted-foreground">
                {dateRange.start} - {dateRange.end}
              </p>
            </div>
          )}
          {showYearSelector && (
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(value === 'all' ? 'all' : parseInt(value))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla år</SelectItem>
                {[1, 2, 3].map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    Årskurs {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      {showStats && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-2xl font-bold">{stats.total} hp</p>
            <p className="text-sm text-muted-foreground">Totalt</p> 
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.completed} hp</p> 
            <p className="text-sm text-muted-foreground">Avklarade</p>   
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.pending} hp</p>
            <p className="text-sm text-muted-foreground">Släpande</p>         
          </div>
        </div>
      )}

      {/* Chart */}
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