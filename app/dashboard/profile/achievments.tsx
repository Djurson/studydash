import * as LucideIcons from "lucide-react";
import achievementsData from "@/data/achievments.json";
import { LucideIcon } from "lucide-react";
import { WithAuthProps } from "@/utils/types";
import { useMemo } from "react";
import { Check } from "lucide-react";

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
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;
  if (!IconComponent) return null;
  return <IconComponent size={30} />;
};

export default function AchievementGrid({ userData }: Partial<WithAuthProps>) {
  // Get all passed course codes
  const passedCourses = useMemo(() => {
    return Array.from(userData?.studyinfo?.values() || [])
      .filter(course => {
        const grade = course?.grade?.toString();
        return grade && !isNaN(parseFloat(grade));
      })
      .map(course => course.code);
  }, [userData?.studyinfo]);

  // Sort and split achievements into passed/unpassed
  const achievementsToDisplay = useMemo(() => {
    const courseAchievements = achievementsData.achievements.course_achievements.course_codes as CourseAchievements;
    const results: { courseCode: string; achievement: Achievement; passed: boolean }[] = [];

    Object.entries(courseAchievements).forEach(([courseCode, achievements]) => {
      achievements.forEach(achievement => {
        results.push({
          courseCode,
          achievement,
          passed: passedCourses.includes(courseCode)
        });
      });
    });

    // Sort: passed first
    return results.sort((a, b) => {
      return (b.passed ? 1 : 0) - (a.passed ? 1 : 0);
    });
  }, [passedCourses]);

  if (achievementsToDisplay.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Inga prestationer att visa ännu. Fortsätt kämpa!
      </div>
    );
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {achievementsToDisplay.map(({ courseCode, achievement, passed }, index) => (
        <div
          key={`${courseCode}-${index}`}
          className="p-4 rounded-xl bg-card text-card-foreground border border-border dark:border-muted shadow-sm flex gap-4 items-center"
        >
          {achievement.icon && (
            <div className="flex-shrink-0">
              <span className="text-muted-foreground">
                {getIconComponent(achievement.icon)}
              </span>
            </div>
          )}
  
          <div className="flex-grow flex flex-col items-center text-center">
            <span className="text-sm font-medium">{achievement.achievement}</span>
            <p className="text-xs text-muted-foreground">{achievement.result}</p>
            <p className="text-[10px] text-muted-foreground">
              <strong>Kurs:</strong> {courseCode}
            </p>
          </div>
  
          <div className="flex-shrink-0">
            {passed && (
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
