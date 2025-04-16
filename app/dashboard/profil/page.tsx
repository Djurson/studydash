import { Button } from "@/components/ui/button"
import Card from "@/components/card/card";
import {SquareUserRound, ChartNoAxesCombined, FileUser, Download} from "lucide-react";
import { PillButton_prest } from "@/components/main/pillbutton_prestationer";
import AchievementGrid from "./achievments";
import { AchievementsCard } from "@/components/card/achievments-card";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Profil
        </h1>
        <p className="text-muted-foreground mt-2">Se din profilinformation och statistik</p>
      </header>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* User Info Card */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <SquareUserRound className="text-primary" size={28} />
            <h2 className="text-xl font-semibold text-foreground">Användare</h2>
          </div>
          <Card variant="no-header" cardTitle="">
            <div className="space-y-5 p-6">
              {[
                { label: "E-postadress", value: "example@student.se" },
                { label: "Namn", value: "John Doe" },
                { label: "Årskurs", value: "3" },
                { label: "Program", value: "Civilingenjör i medieteknik" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-foreground font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Statistics Card */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <ChartNoAxesCombined className="text-primary" size={28} />
            <h2 className="text-xl font-semibold text-foreground">Statistik</h2>
          </div>
          <Card variant="no-header" cardTitle="">
            <div className="space-y-5 p-6">
              {[
                { label: "Intjänade högskolpoäng", value: "-200" },
                { label: "Avklarade kurser", value: "0" },
                { label: "Snittbetyg", value: "2" },
                { label: "Högskolepoäng till examen", value: "350" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-foreground font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Data Export Card */}
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
          <PillButton_prest />
        </div>
        <Card variant="no-header" cardTitle="">
          <AchievementGrid/></Card>
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