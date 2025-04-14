// editcontext.tsx
import React, { createContext, useContext, useMemo, useRef } from "react";
import { Course, Examination, CourseJSON, ExaminationJSON } from "@/utils/types";
import { CreateCourse, CreateExamination } from "@/utils/utils";

export interface StudyResultContextType {
  studyResults: React.RefObject<Map<string, Course>>; // TS infererar rätt typ vid useRef
  updateCourse: (key: string, course: Course) => void;
  updateExamination: (courseCode: string, examCode: string, examination: Examination) => void;
  updateMap: (inputMap: Map<string, Course>) => void;
  hasExamination: (courseCode: string, examCode: string) => boolean;
  hasCourse: (courseCode: string) => boolean;
  getExamination: (courseCode: string, examCode: string) => Examination | undefined;
  getCourse: (courseCode: string) => Course | undefined;
  updateExamResult: (courseJSON: CourseJSON, examJSON: ExaminationJSON, updates: Partial<Examination>) => void;
}

export const StudyResultContext = createContext<StudyResultContextType | undefined>(undefined);

export function useStudyResults() {
  const context = useContext(StudyResultContext);
  if (!context) {
    throw new Error("useStudyResults must be used within a StudyResultProvider");
  }
  return context;
}

export function StudyResultProvider({ children }: { children: React.ReactNode }) {
  const studyResultsRef = useRef<Map<string, Course>>(new Map());
  const listenersRef = useRef(new Set<() => void>());

  const notify = () => {
    listenersRef.current.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  };

  const updateCourse = (key: string, course: Course) => {
    studyResultsRef.current.set(key, course);
  };

  const updateExamination = (courseCode: string, examCode: string, examination: Examination) => {
    const course = studyResultsRef.current.get(courseCode);
    if (course) {
      course.examinations.set(examCode, examination);
    }
  };

  const updateMap = (inputMap: Map<string, Course>) => {
    inputMap.forEach((value, key) => {
      studyResultsRef.current.set(key, value);
    });
  };

  const hasExamination = (courseCode: string, examCode: string): boolean => {
    return Boolean(studyResultsRef.current.get(courseCode)?.examinations.has(examCode));
  };

  const hasCourse = (courseCode: string): boolean => {
    return studyResultsRef.current.has(courseCode);
  };

  const getExamination = (courseCode: string, examCode: string): Examination | undefined => {
    return studyResultsRef.current.get(courseCode)?.examinations.get(examCode);
  };

  const getCourse = (courseCode: string): Course | undefined => {
    return studyResultsRef.current.get(courseCode);
  };

  const updateExamResult = (courseJSON: CourseJSON, examJSON: ExaminationJSON, updates: Partial<Examination>) => {
    const courseCode = courseJSON.course_code;
    const examCode = examJSON.code;

    let course = studyResultsRef.current.get(courseCode);
    if (!course) {
      course = CreateCourse(courseJSON.name, courseJSON.course_code, Number.parseFloat(courseJSON.credits.replace("hp", "").trim().replace(",", ".")));
      studyResultsRef.current.set(courseCode, course);
    }

    let exam = course.examinations.get(examCode);
    if (!exam) {
      exam = CreateExamination(examJSON.name, examJSON.code, Number.parseFloat(courseJSON.credits.replace("hp", "").trim().replace(",", ".")));
    }

    const updatedExam = { ...exam, ...updates };
    course.examinations.set(examCode, updatedExam);
  };

  const value = useMemo(
    () => ({
      studyResults: studyResultsRef,
      updateCourse,
      updateExamination,
      updateMap,
      hasExamination,
      hasCourse,
      getExamination,
      getCourse,
      updateExamResult,
    }),
    []
  );
  return <StudyResultContext.Provider value={value}>{children}</StudyResultContext.Provider>;
}
