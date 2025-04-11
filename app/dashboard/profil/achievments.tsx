import { Camera, Trophy, Star, Film } from "lucide-react"; 
import achievementsData from "@/data/achievments.json"; 


type Achievement = {
    achievement: string;
    result: string;
    icon?: string; 
  };
  
  type CourseAchievements = {
    [courseCode: string]: Achievement[];
  };
  
 
  const iconMap: Record<string, React.ReactNode> = {
    Camera: <Camera size={30} />,
    Trophy: <Trophy size={30} />,
    Star: <Star size={30} />,
    Film: <Film size={30} />,
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
              
              {item.icon && iconMap[item.icon] && (
                <div className="flex-shrink-0">
                  <span className="text-muted-foreground">{iconMap[item.icon]}</span>
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
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
  

  