"use client"

import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { CheckCheck, GraduationCap, BookOpenCheck, ScrollText } from "lucide-react"
import React from "react"

export function StudyProgress() {
  const currentPoints = 110 // Example - replace with your actual points
  const totalPoints = 300
  
  const milestones = [
    { points: 45, label: "Kandidat", icon: <BookOpenCheck className="h-4 w-4" /> },
    { points: 150, label: "Kd. projekt", icon: <ScrollText className="h-4 w-4" /> },
    { points: 225, label: "Master", icon: <GraduationCap className="h-4 w-4" /> },
    { points: 300, label: "Exjobb", icon: <CheckCheck className="h-4 w-4" /> }
  ]

  // Find next milestone
  const nextMilestone = milestones.find(m => m.points > currentPoints)
  const pointsRemaining = nextMilestone ? nextMilestone.points - currentPoints : 0

  return (
    <div className="col-span-2">
        <div className="p-4">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              {milestones.map((milestone) => (
                <div 
                  key={milestone.points}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${(milestone.points / totalPoints) * 100}%` }}>
                  <span className="text-xs mt-1 text-muted-foreground">
                    {milestone.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          
          <div className="mb-8">
            <Progress 
              value={(currentPoints / totalPoints) * 100} 
              className="h-3 bg-gray-100" 
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Framsteg</p>
              <p className="text-lg font-semibold">
                {currentPoints} / {totalPoints} hp
              </p>
              <p className="text-sm text-muted-foreground">
                {Math.round((currentPoints / totalPoints) * 100)}% slutfört
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Nästa milstolpe</p>
              <p className="text-lg font-semibold">
                {nextMilestone?.label || "Alla klara"}
              </p>
              <p className="text-sm text-muted-foreground">
                {nextMilestone ? `${pointsRemaining} hp kvar` : "Grattis!"}
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}
