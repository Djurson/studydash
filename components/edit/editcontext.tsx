import { Course } from "@/utils/types";
import { Dispatch, SetStateAction, createContext, useContext, ReactNode, useState } from "react";

type EditContextType = {
  studyResults: Map<string, Course>;
  setStudyResults: Dispatch<SetStateAction<Map<string, Course>>>;
};

const EditContext = createContext<EditContextType | undefined>(undefined);

export function useStudyResult() {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error("useMyContext måste användas inom en MyProvider");
  }
  return context;
}

export function EditCourseProvider({ children }: { children: ReactNode }) {
  const [studyResults, setStudyResults] = useState<Map<string, Course>>(new Map());

  return <EditContext.Provider value={{ studyResults, setStudyResults }}>{children}</EditContext.Provider>;
}