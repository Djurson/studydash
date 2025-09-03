"use client";

// This is a client component wrapper that handles state
import React, { useState } from "react";
import { PillbuttonContainer } from "@/components/main/pillbutton";
import SemesterSection from "@/components/program/semesterSection";
import { CourseJSON, UserData } from "@/utils/types";
import userProgram from "../utils/userProgram";

type FilterType = {
  type: 'term' | 'area' | 'level';
  value: string;
  label: string;
};

export default function CourseClientWrapper({ userData }: { userData: UserData | undefined }) {
  const mainSubjects = new Map<string, CourseJSON[]>();
  const unfinishedCourses: CourseJSON[] = [];
  const finishedCourses: CourseJSON[] = [];
  // Client-side state management
  const [selected, setSelected] = useState<string>("Alla");
  const program = userProgram(userData);

  program.semesters.map((semsesters) => {
    semsesters.courses.map((course) => {
      const firstSubject = course.overview.main_subject.split(",")[0].trim();
      // Use first subject as primary category
      if (mainSubjects.has(firstSubject)) {
        mainSubjects.get(firstSubject)?.push(course);
      } else {
        mainSubjects.set(firstSubject, [course]);
      }
    });
  });

  program.semesters.map((semsesters) => {
    semsesters.courses.map((course) => {
      if (!userData?.studyinfo.get(course.course_code)?.grade) {
        unfinishedCourses.push(course);
      } else {
        finishedCourses.push(course);
      }
    });
  });

  const convertToFilters = (selected: string): FilterType[] => {
    if (!selected || selected === "Alla") return [];
    return [{ 
      type: 'area', // or whatever type makes sense for your subjects
      value: selected, 
      label: selected 
    }];
  };

  const handleFilterChange = (filters: FilterType[]) => {
    const newSelected = filters.length > 0 ? filters[0].value : "Alla";
    setSelected(newSelected);
  };
  return (
    <>
      {/* PillbuttonContainer with viewModes */}
      <PillbuttonContainer  mainSubjects={mainSubjects} 
      selectedFilters={convertToFilters(selected)} 
      setSelectedFilters={handleFilterChange}  />

      {/* SemesterSection gets selected state */}
      <SemesterSection userData={userData} mainSubjects={mainSubjects} unfinishedCourses={unfinishedCourses} finishedCourses={finishedCourses} selected={selected} />
    </>
  );
}
