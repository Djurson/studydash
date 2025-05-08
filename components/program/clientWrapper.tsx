"use client";

// This is a client component wrapper that handles state
import React, { useState } from "react";
import { PillbuttonContainer } from "@/components/main/pillbutton";
import SemesterSection from "@/components/program/semesterSection";
import { Course, CourseJSON, UserData } from "@/utils/types";
import programData from "@/webscraping/6CEMEN-2022.json";

export default function CourseClientWrapper({ userData }: { userData: UserData | undefined }) {
  const mainSubjects = new Map<string, CourseJSON[]>();
  const unfinishedCourses: CourseJSON[] = [];
  const finishedCourses: CourseJSON[] = [];
  // Client-side state management
  const [selected, setSelected] = useState<string>("Alla");
  const program = programData.programs[0];

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

  console.log(selected);
  // Define view modes for organization
  const viewModes = ["By Subject", "By Semester", "By Credits"];

  return (
    <>
      {/* PillbuttonContainer with viewModes */}
      <PillbuttonContainer mainSubjects={mainSubjects} selected={selected} setSelected={setSelected} />

      {/* SemesterSection gets selected state */}
      <SemesterSection userData={userData} mainSubjects={mainSubjects} unfinishedCourses={unfinishedCourses} finishedCourses={finishedCourses} selected={selected} />
    </>
  );
}
