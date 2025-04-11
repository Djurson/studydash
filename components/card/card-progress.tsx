"use client"

import Card from "@/components/card/card";
import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Label, Pie, PieChart, Tooltip } from "recharts";
import { Check} from "lucide-react"


// Properly format the data for Recharts


export default function CardProgress({
    startyear,
    hp,
    year,
    complete,
}: any) {

    var progress = hp;

    const data = [
        { name: "Completed", value: progress, fill: "#3b82f6" },
        { name: "Remaining", value: 100 - progress, fill: "#e5e7eb" }
    ];

    if (year == "1") {
        if (hp >= 37) {
            return (
                <>
                    <div className={`${complete == 'true' ? 'border-2 border-green-900 rounded-2xl' : ''} row-span-1, col-span-1 `}>
                        <Card variant="compact" cardTitle="">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3>{"Årskurs " + year}</h3>
                                    <p>{startyear + " - " + [startyear + 1]}</p>
                                </div>
                                <div className="w-3/4 flex items-center justify between">
                                    <div className="flex justify-center bg-green-900 rounded-full p-2">
                                        <Check style={{color: 'white'}}/>
                                    </div>
                                    <div>
                                        
                                        <Progress value={progress} className="mt-4 bg-green-900" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </>
            );
        }
        else{
            return
        }

    }
    else if (hp >= 45) {
        return (
            <>
                <div className={`${complete == 'true' ? 'border-2 border-green-900 rounded-2xl' : ''} row-span-1, col-span-1 `}>
                    <Card variant="compact" cardTitle="">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3>{"Årskurs " + year}</h3>
                                <p>{startyear + " - " + [startyear + 1]}</p>
                            </div>
                            <div className="w-3/4 flex items-center justify between">
                                <div className="flex justify-center">
                                </div>
                                <Progress value={progress} className="mt-4" />
                            </div>
                        </div>
                    </Card>
                </div>
            </>
        );
    }
    else {
        return (
            <>
        <div className={`${complete == 'true' ? 'border-2 border-green-900 rounded-2xl' : ''} row-span-1, col-span-1 `}>
            <Card variant="compact" cardTitle="">
                <div className="flex items-center justify-between">
                    <div>
                        <h3>{"Årskurs " + year}</h3>
                        <p>{startyear + " - " + [startyear + 1]}</p>
                    </div>
                    <div className="w-3/4 flex items-center justify between">
                        <div className="flex justify-center">
                            <PieChart width={80} height={80}>
                                <Tooltip />
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={25}
                                    outerRadius={30}
                                    strokeWidth={4}
                                    stroke="none"
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-m font-bold"
                                                        >
                                                            {progress + "%"}
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </div>
                        <Progress value={progress} className="mt-4" />
                    </div>
                </div>
            </Card>
        </div>
        </>
        )

    }
}
