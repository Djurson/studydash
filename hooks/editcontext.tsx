// ClientEditCourseProvider.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { Course } from "@/utils/types";

type EditContextType = {
  studyResults: Map<string, Course>;
  setStudyResults: React.Dispatch<React.SetStateAction<Map<string, Course>>>;
};

const EditContext = createContext<EditContextType | undefined>(undefined);

export function useStudyResult() {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error("useStudyResult must be used within a EditCourseProvider");
  }
  return context;
}

export function EditCourseContext({ children }: { children: React.ReactNode }) {
  const [studyResults, setStudyResults] = useState<Map<string, Course>>(new Map());

  return <EditContext.Provider value={{ studyResults, setStudyResults }}>{children}</EditContext.Provider>;
}
