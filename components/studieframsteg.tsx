"use client"

import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { CheckCheck, GraduationCap, BookOpenCheck, ScrollText } from "lucide-react"
import React from "react"

export function StudyProgress() {
  const currentPoints = 200
  const totalPoints = 300
  
  const milestones = [
    { points: 70, label: "Kandidat", icon: <BookOpenCheck className="h-4 w-4" /> },
    { points: 150, label: "Kd. projekt", icon: <ScrollText className="h-4 w-4" /> },
    { points: 225, label: "Master", icon: <GraduationCap className="h-4 w-4" /> },
    { points: 300, label: "Exjobb", icon: <CheckCheck className="h-4 w-4" /> }
  ]

  // Find next milestone
  const nextMilestone = milestones.find(m => m.points > currentPoints)
  const pointsRemaining = nextMilestone ? nextMilestone.points - currentPoints : 0

  return (
    <div className="col-span-2">
      

        {/* Stats section */}
        <div className="flex justify-between items-center mb-4">
          <div>
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
              {nextMilestone?.label}
            </p>
            <p className="text-sm text-muted-foreground">
              {nextMilestone ? `${pointsRemaining} hp kvar` : ""}
            </p>
          </div>
        </div>
        <div className="p-4">
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            {milestones.map((milestone) => (
              <div 
                key={milestone.points}
                className="absolute flex flex-col items-center"
                style={{
                    left: `${(milestone.points / totalPoints) * 100}%`,
                    transform: 'translateX(-100%)' 
                  }}
              >
                <span className="text-xs text-muted-foreground">
                  {milestone.label}
                </span>
                <div className="w-2 h-2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <Progress 
            value={(currentPoints / totalPoints) * 100} 
            className="h-4 bg-gray-100" 
          />
        </div>
      </div>
    </div>
  )
}