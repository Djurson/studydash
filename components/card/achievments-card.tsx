import React, { ReactNode } from "react";

interface AchievementsCardProps {
  cardTitle: string;
  children: ReactNode;
}

export const AchievementsCard: React.FC<AchievementsCardProps> = ({ cardTitle, children }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
    
        <h2 className="text-xl font-semibold">{cardTitle}</h2>
     

      <div className="p-4 h-96 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};