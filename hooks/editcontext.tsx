import React, { createContext, Dispatch, SetStateAction, useContext, useMemo, useRef, useState } from "react";
import { Course, Examination, CourseJSON, ExaminationJSON } from "@/utils/types";
import { CreateCourse, CreateExamination } from "@/utils/utils";

export interface StudyResultContextType {
  studyResults: React.RefObject<Map<string, Course>>;
  setCourse: (key: string, course: Course) => void;
  setExamination: (courseCode: string, examCode: string, examination: Examination) => void;
  updateMap: (inputMap: Map<string, Course>) => void;
  hasExamination: (courseCode: string, examCode: string) => boolean;
  hasCourse: (courseCode: string) => boolean;
  getExamination: (courseCode: string, examCode: string) => Examination | undefined;
  getCourse: (courseCode: string) => Course | undefined;
  updateExamResult: (courseJSON: CourseJSON, examJSON: ExaminationJSON, updates: Partial<Examination>) => void;
  updateCourseResult: (CourseJSON: CourseJSON, updates: Partial<Course>) => void;
  clearMap: () => void;
  studyResultsToJSON: (studyResults: Map<string, Course>) => string;
  jsonToStudyResults: (json: string) => Map<string, Course>;
  subscribe: (listener: () => void) => () => void;
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

  const setCourse = (key: string, course: Course) => {
    studyResultsRef.current.set(key, course);
    notify();
  };

  const setExamination = (courseCode: string, examCode: string, examination: Examination) => {
    const course = studyResultsRef.current.get(courseCode);
    if (course) {
      course.examinations.set(examCode, examination);
    }
    notify();
  };

  const updateMap = (inputMap: Map<string, Course>) => {
    inputMap.forEach((value, key) => {
      studyResultsRef.current.set(key, value);
    });
    notify();
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

  const clearMap = () => {
    studyResultsRef.current.clear();
    notify();
  };

  const studyResultsToJSON = (studyResults: Map<string, Course>): string => {
    const coursesObj = Object.fromEntries(
      Array.from(studyResults.entries()).map(([key, course]) => [
        key,
        {
          ...course,
          examinations: Object.fromEntries(course.examinations),
        },
      ])
    );

    return JSON.stringify(coursesObj);
  };

  const jsonToStudyResults = (json: string): Map<string, Course> => {
    const parsed = JSON.parse(json);

    return new Map(
      Object.entries(parsed).map(([key, courseObj]: [string, any]) => [
        key,
        {
          ...courseObj,
          examinations: new Map(Object.entries(courseObj.examinations)),
        },
      ])
    );
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
    notify();
  };

  const updateCourseResult = (courseJSON: CourseJSON, updates: Partial<Course>) => {
    const courseCode = courseJSON.course_code;

    let course = studyResultsRef.current.get(courseCode);
    if (!course) {
      course = CreateCourse(courseJSON.name, courseJSON.course_code, Number.parseFloat(courseJSON.credits.replace("hp", "").trim().replace(",", ".")));
      studyResultsRef.current.set(courseCode, course);
    }

    const updatedCourse = { ...course, ...updates };
    studyResultsRef.current.set(courseCode, updatedCourse);
    notify();
  };

  const value = useMemo(
    () => ({
      studyResults: studyResultsRef,
      setCourse,
      setExamination,
      updateMap,
      hasExamination,
      hasCourse,
      getExamination,
      getCourse,
      updateExamResult,
      updateCourseResult,
      clearMap,
      subscribe,
      studyResultsToJSON,
      jsonToStudyResults,
    }),
    []
  );
  return <StudyResultContext.Provider value={value}>{children}</StudyResultContext.Provider>;
}

export function useStudyResultsListener() {
  const context = useStudyResults();
  const [, forceRender] = React.useReducer((s) => s + 1, 0);

  React.useEffect(() => {
    // Detta kommer att orsaka en omrendrering när notify() anropas
    const unsubscribe = context.subscribe(forceRender);
    return unsubscribe;
  }, [context]);

  return context;
}
