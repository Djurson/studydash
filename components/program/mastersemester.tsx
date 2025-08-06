"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Separator } from "../ui/separator";
import { Course, UserData } from "@/utils/types";
import { Status, StatusSquare } from "../edit/statussquare";

type Term = "termin7" | "termin8" | "termin9";

type CourseType = {
  name: string;
  course_code: string;
  credits: string;
  semesterName: string;
  availableTerms: Term[];
  overview?: {
    education_level?: string;
    main_subject?: string | string[];
  };
};

export function MasterSemester({ semesterName, courses, userData, subjectfilter }: { semesterName: string; courses: CourseType[]; userData: UserData | undefined; subjectfilter: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total credits for all courses in this semester
  const totalCredits = courses.reduce((sum, course) => {
    return sum + Number(course.credits.replace("hp", "").trim());
  }, 0);

  // Determine overall semester status based on all courses
  const getSemesterStatus = (): Status => {
    let hasCompletedCourses = false;
    let hasIncompleteCourses = false;

    for (const course of courses) {
      const status = GetStatus(userData?.studyinfo, course.course_code);
      if (status === "done") {
        hasCompletedCourses = true;
      } else {
        hasIncompleteCourses = true;
      }
    }

    if (hasCompletedCourses && !hasIncompleteCourses) {
      return "done";
    }
    if (hasCompletedCourses && hasIncompleteCourses) {
      return "ongoing";
    }
    if (hasIncompleteCourses) {
      return "ongoing";
    }
    return "none";
  };

  const semesterStatus = getSemesterStatus();

  return (
    <div>
      <main className="bg-accent overflow-hidden rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
        <button className="flex items-center justify-between w-full p-4 cursor-pointer hover:bg-highlight-2" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex gap-4 items-center">
            <StatusSquare status={semesterStatus} />
            <h3 className="text-lg font-medium">{semesterName}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-29">
              {!subjectfilter && <p className="text-sm text-gray-600 w-22 text-center">{courses.length} kurser</p>}
              <div className="w-17.5 h-1"></div>
              <p className="text-sm text-gray-600 w-13 text-right">{totalCredits} hp</p>
            </div>
            <ChevronDown size={24} className={`col-start-8 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
          </div>
        </button>
        <section>
          {isOpen && (
            <div className="bg-accent px-4 pb-4">
              <div className="flex flex-col w-full">
                <div className="flex relative w-full">
                  <div className="absolute left-[0.563rem] top-0 bottom-0 w-px bg-secondary z-0" />
                  <div className="flex flex-col pl-[1.125rem] w-full">
                    {courses.map((course, index) => {
                      const grade = userData?.studyinfo.get(course.course_code)?.grade;
                      const status = GetStatus(userData?.studyinfo, course.course_code);

                      return (
                        <div key={course.course_code}>
                          <div className="w-full text-left items-center py-2">
                            <div className="flex justify-between flex-row gap-4 items-center">
                              <div className="flex gap-4 items-center">
                                <StatusSquare status={status} />
                                <h4 className="font-medium text-sm">
                                  {course.name} - {course.course_code}
                                </h4>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-29">
                                  {grade && grade !== "" ? (
                                    <div className="flex items-center">
                                      <div className="border-1 border-green-900 rounded-xl px-2 py-1">
                                        <p className="text-sm items-center text-green-900">Betyg {grade}</p>
                                      </div>
                                    </div>
                                  ) : null}
                                  <div>
                                    <p className="font-medium text-sm w-13 text-right">{course.credits}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Course details */}
                          <div className="pl-8 pb-2">
                            <div className="text-xs text-gray-500">
                              <p>
                                <strong>Tillgängliga terminer:</strong> {course.availableTerms.join(", ")}
                              </p>
                              {course.overview?.education_level && (
                                <p>
                                  <strong>Utbildningsnivå:</strong> {course.overview.education_level}
                                </p>
                              )}
                              {course.overview?.main_subject && (
                                <p>
                                  <strong>Huvudområde:</strong> {Array.isArray(course.overview.main_subject) ? course.overview.main_subject.join(", ") : course.overview.main_subject}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Add separator between courses except for the last one */}
                          {index < courses.length - 1 && (
                            <div className="pl-8 pr-10">
                              <Separator />
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <Separator />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function GetStatus(studyMap: Map<string, Course> | undefined, course_code: string): Status {
  if (!studyMap) {
    return "none";
  }

  const courseResult = studyMap.get(course_code);

  if (!courseResult) {
    return "none";
  }

  if (courseResult.grade !== "") {
    return "done";
  }

  return "ongoing";
}
