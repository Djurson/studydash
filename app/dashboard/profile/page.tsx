import { Button } from "@/components/ui/button"
import Card from "@/components/card/card";
import {SquareUserRound, ChartNoAxesCombined, FileUser, Download} from "lucide-react";
import { WithAuthProps } from "@/utils/types";
import { withAuth } from "@/serverhooks/withAuth";
import AchievementGrid from "./achievments";


const calculateAverageGrade = (userData: any): string => {
  if (!userData?.studyinfo) return "-";
  
  let totalCredits = 0;
  let weightedSum = 0;
  let gradedCourses = 0;
  

  userData.studyinfo.forEach((course: any) => {
    if (course.grade && !isNaN(parseFloat(course.grade))) {
      const credits = parseFloat(course.hp) || 0;
      const grade = parseFloat(course.grade);
      
      totalCredits += credits;
      weightedSum += credits * grade;
      gradedCourses++;
    }
  });

  if (gradedCourses === 0) return "-";

  const average = weightedSum / totalCredits;
  return average.toFixed(1); 
};



async function Page({ user, userData }: WithAuthProps) {
  const averageGrade = calculateAverageGrade(userData);


  const finishedCourses = Array.from(userData?.studyinfo?.values() || [])
  .filter(course => course?.grade && !isNaN(parseFloat(course.grade.toString())))
  .length;

  const totalCredits = userData?.sortedDateMap
  ? Array.from(userData.sortedDateMap.values())
      .flat() 
      .filter(exam => {
        const grade = exam.grade?.toString().toUpperCase();
        return grade === 'P' || grade === 'G' || 
               (grade && !isNaN(parseFloat(grade)) && parseFloat(grade) >= 3);
      })
      .reduce((sum, exam) => sum + (exam.hp || 0), 0)
  : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Profil
        </h1>
        <p className="text-muted-foreground mt-2">Se din profilinformation och statistik</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <SquareUserRound className="text-primary" size={28} />
            <h2 className="text-xl font-semibold text-foreground">Användare</h2>
          </div>
          <Card variant="no-header" cardTitle="">
            <div className="space-y-5 p-6">
              {[
                { label: "Email", value: user?.email || "-" },
                { label: "Namn", value: user.user_metadata?.name|| "-" },
                { label: "Årskurs", value: userData?.studyyear },
                { label: "Program", value: userData?.program || "-" }
              ].map((item, index) => (
                <div key={index} className="grid grid-cols-[auto_1fr] items-start">
                <span className="text-foreground font-medium h-[2rem] flex items-center">
                    {item.label}
                </span>
                <span className="text-muted-foreground text-right h-[2rem] flex items-center justify-end">
                    {item.value}
                </span>
             </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <ChartNoAxesCombined className="text-primary" size={28} />
            <h2 className="text-xl font-semibold text-foreground">Statistik</h2>
          </div>
          <Card variant="no-header" cardTitle="">
            <div className="space-y-7 p-6">
              {[
                { label: "Intjänade högskolpoäng", value: totalCredits.toString() },
                { label: "Avklarade kurser", value: finishedCourses.toString() },
                { label: "Snittbetyg", value: averageGrade },
                { label: "Högskolepoäng till examen", value: (300-totalCredits) }
              ].map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-foreground font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <FileUser className="text-primary" size={28} />
            <h2 className="text-xl font-semibold text-foreground">Användardata</h2>
          </div>
          <Card variant="no-header" cardTitle="">
            <div className="p-6 flex flex-col items-center justify-center h-full">
              <p className="text-foreground mb-6 text-center">
                Här kan du ladda ner din användardata som en PDF!
              </p>
              <Button size="lg" className="bg-green-900 w-full h-[5rem]" >
                <Download color="white" size={200}></Download>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Prestationer</h2>
        </div>
        <Card variant="no-header" cardTitle="">
     
        <AchievementGrid userData={userData}/>
        </Card>
      </section>
      
      <section className="max-w-lg mx-auto">
        <Card variant="no-header" cardTitle="">
          <div className="flex flex-col sm:flex-row gap-4 p-6">
            <Button variant="secondary" className="flex-1 py-6 text-foreground hover:bg-secondary/80">
              Logga ut
            </Button>
            <Button variant="destructive" className="flex-1 py-6 hover:bg-destructive/90">
              Ta bort konto
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default withAuth(Page);