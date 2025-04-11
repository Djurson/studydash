import * as LucideIcons from "lucide-react";
import achievementsData from "@/data/achievments.json";
import { LucideIcon } from "lucide-react"; // Import the icon type

type Achievement = {
  achievement: string;
  result: string;
  icon?: string;
};

type CourseAchievements = {
  [courseCode: string]: Achievement[];
};

const getIconComponent = (iconName?: string) => {
  if (!iconName) return null;
  
  // Type assertion for the icon component
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;
  
  if (!IconComponent) return null;
  return <IconComponent size={30} />;
};

export default function AchievementGrid() {
  const courseAchievements = achievementsData.achievements.course_achievements.course_codes as CourseAchievements;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {Object.entries(courseAchievements).flatMap(([courseCode, items]) =>
        items.map((item, index) => (
          <div
            key={`${courseCode}-${index}`}
            className="p-4 rounded-xl bg-card text-card-foreground border border-border shadow-sm flex gap-4 items-center"
          >
            {item.icon && (
              <div className="flex-shrink-0">
                <span className="text-muted-foreground">
                  {getIconComponent(item.icon)}
                </span>
              </div>
            )}

            <div className="flex-grow flex flex-col items-center text-center">
              <span className="text-sm font-medium">{item.achievement}</span>
              <p className="text-xs text-muted-foreground">{item.result}</p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Kurs:</strong> {courseCode}
              </p>
            </div>

            <div className="flex-shrink-0">
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-green-500 cursor-pointer" 
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}