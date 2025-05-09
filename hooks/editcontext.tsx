import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Course, Examination, CourseJSON, ExaminationJSON } from "@/utils/types";
import { CreateCourse, CreateExamination } from "@/utils/utils";
import { GetUserData } from "@/app/results/actions";

export interface StudyResultContextType {
  studyResults: React.RefObject<Map<string, Course>>;
  studyResultsOrg: React.RefObject<Map<string, Course>>;
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

export function StudyResultProvider({ children }: { children: ReactNode }) {
  const studyResultsRef = useRef<Map<string, Course>>(new Map());
  const studyResultsRefOrg = useRef<Map<string, Course>>(new Map());
  const listenersRef = useRef(new Set<() => void>());

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await GetUserData();
      if (userData) {
        studyResultsRef.current = userData.studyinfo;
        studyResultsRefOrg.current = deepCopyMap(studyResultsRef.current);
        notify(); // Meddela alla lyssnare om den nya datan
      }
    };

    fetchUserData();
  }, []);

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
    studyResultsRef.current = studyResultsRefOrg.current;
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

  const value = {
    studyResults: studyResultsRef,
    studyResultsOrg: studyResultsRefOrg,
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
  };
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

function deepCopyMap(original: Map<string, Course>): Map<string, Course> {
  const copied = new Map<string, Course>();

  for (const [courseCode, course] of original.entries()) {
    const copiedExaminations = new Map<string, Examination>();
    for (const [examCode, exam] of course.examinations.entries()) {
      copiedExaminations.set(examCode, { ...exam }); // shallow copy räcker för Examination
    }

    const copiedCourse: Course = {
      ...course, // shallow copy för övriga fält
      examinations: copiedExaminations,
    };

    copied.set(courseCode, copiedCourse);
  }

  return copied;
}
