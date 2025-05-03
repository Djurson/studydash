"use client";

import { Separator } from "../ui/separator";
import { CircleOff, Info } from "lucide-react";
import { useStudyResults, useStudyResultsListener } from "@/hooks/editcontext";
import { StatusSquare } from "./statussquare";
import { Course } from "@/utils/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { WriteToDatabase } from "@/app/results/actions";

type ChangeHistoryProps = {
  studyYear: string | undefined;
  studyProgram: string | undefined;
  studyUniversity: string | undefined;
  previousFounds: boolean;
};

export function ChangeHistory({ ...props }: ChangeHistoryProps) {
  const { studyResults } = useStudyResultsListener();
  const { clearMap, studyResultsToJSON } = useStudyResults();

  let plusHp = 0;

  const filteredStudies = new Map(
    Array.from(studyResults.current.entries())
      .map(([courseCode, course]) => {
        // Om kursen själv har ett giltigt betyg, behåll hela kursen
        if (course.grade !== "" && course.grade !== 0 && course.grade !== null && course.grade !== undefined && course.date) {
          return [courseCode, { ...course }];
        }
        // Annars, filtrera examinationerna
        else {
          // Skapa en ny map med bara godkända examinationer
          const filteredExaminations = new Map(
            Array.from(course.examinations.entries()).filter(([, exam]) => exam.grade !== "" && exam.grade !== 0 && exam.grade !== null && exam.grade !== undefined && exam.date)
          );

          // Returnera kursen med filtrerade examinationer om det finns några
          if (filteredExaminations.size > 0) {
            return [courseCode, { ...course, examinations: filteredExaminations }];
          }

          // Returnera null om kursen inte har några godkända examinationer
          return null;
        }
      })
      .filter((entry) => entry !== null) as [string, Course][]
  );

  function HandleSubmit() {
    const error = SubmitToServer(filteredStudies, studyResultsToJSON, { ...props });

    // Om det blir en error, visa den error:n med en toaster
    if (error) {
      toast(
        <div className="flex gap-4 items-center">
          <Info className="stroke-red-900" /> <p className="text-red-900">{error}</p>
        </div>
      );
    }
  }
  return (
    <>
      <main className="flex flex-col bg-accent rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full max-h-[66.1vh]">
        <header className="p-4 flex gap-4 items-center justify-center">
          <div className="text-center bg-blue-200 dark:bg-highlight px-1.5 rounded-md ">
            <p>{filteredStudies.size}</p>
          </div>
          <p className="text-lg">Ändringar gjorda</p>
        </header>
        <Separator className="bg-secondary" />
        <section className="px-4 overflow-auto">
          {filteredStudies.size !== 0 && (
            <>
              <div className="py-2.5 flex flex-col justify-between items-start gap-2">
                {filteredStudies.size !== 0 &&
                  [...filteredStudies.entries()].map(([coursecode, course]) => {
                    return [...course.examinations.entries()].map(([examcode, exam]) => {
                      plusHp += exam.hp;
                      return (
                        <div className="flex flex-col gap-2 w-full" key={examcode}>
                          <div className="flex gap-2 items-center">
                            <StatusSquare status="added" />
                            <p className="text-sm">
                              {coursecode}/{exam.name} - {exam.code}
                            </p>
                          </div>
                          <Separator />
                        </div>
                      );
                    });
                  })}
              </div>
            </>
          )}
          {filteredStudies.size === 0 && (
            <>
              {/* <Separator /> */}
              <div className="flex flex-col justify-center items-center py-2">
                <CircleOff className="h-8 aspect-square" />
                <p className="text-sm">Inga ändringar gjorda</p>
              </div>
            </>
          )}
        </section>
        <Separator />
        <footer className="flex flex-col p-4 ">
          <div className="flex flex-col gap-2">
            {/*Denna div ska dyka upp om ändringar gjorts*/}
            {filteredStudies.size !== 0 && (
              <div className="flex justify-between text-sm pb-4">
                <p>Tillagt:</p>
                <p className="text-green-900">+{plusHp} hp</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <button type="button" className="w-full px-4 py-3 bg-blue-900 text-white rounded-sm font-medium text-sm cursor-pointer disabled:cursor-not-allowed" onClick={HandleSubmit}>
              Bekräfta
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full px-4 py-3 bg-background hover:bg-highlight-2 hover:text-red-900 font-medium rounded-sm text-sm cursor-pointer">Avbryt</button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex gap-2 items-center">
                    <Info className="stroke-red-900 stroke-2 size-4" />
                    Ta bort all ifylld information?
                  </AlertDialogTitle>
                  <AlertDialogDescription>Genom att klicka på "Ta bort" kommer all ifylld information att tas bort.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-foreground transition duration-300 ease-in-out">Avbryt</AlertDialogCancel>
                  <AlertDialogAction className="bg-foreground hover:bg-red-900 transition hover:text-foreground duration-300 ease-in-out" onClick={clearMap}>
                    Ta bort
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </footer>
      </main>
    </>
  );
}

function SubmitToServer(filteredStudies: Map<string, Course>, studyResultsToJSON: (studyResults: Map<string, Course>) => string, { ...props }: ChangeHistoryProps): string | undefined {
  if (filteredStudies.size === 0) {
    return "Vänligen fyll i studieresultat";
  }

  if (props.studyProgram === "") {
    return "Vänligen välj ett program";
  }

  if (props.studyYear === "") {
    return "Vänligen välj ett studieår";
  }

  if (props.studyUniversity === "") {
    return "Vänligen välj ett universitet";
  }

  // Om det inte finns några errors, konvertera från hashmap till JSON
  const jsonResults = studyResultsToJSON(filteredStudies);

  WriteToDatabase(jsonResults, { ...props });
}
