"use client";
import { useState, useEffect } from "react";
import { ChevronDown, CirclePlus, X } from "lucide-react";
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

interface EditMasterSemesterProps {
  semester: {
    fullString: string;
    semester: "HT" | "VT";
    year: number;
  };
  index: number;
  userData?: UserData;
  selectedCourses?: {
    termin7: CourseType[];
    termin8: CourseType[];
    termin9: CourseType[];
  };
  groupedCourses?: Map<string, CourseType[]>;
}

const loadSelectedCourses = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("selectedCourses");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.termin7 && parsed.termin8 && parsed.termin9) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved courses", e);
      }
    }
  }
  return { termin7: [], termin8: [], termin9: [] };
};

const saveSelectedCourses = (courses: { termin7: CourseType[]; termin8: CourseType[]; termin9: CourseType[] }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedCourses", JSON.stringify(courses));
  }
};

export default function EditMasterSemester({ semester, index, userData, selectedCourses: propSelectedCourses, groupedCourses }: EditMasterSemesterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<{
    termin7: CourseType[];
    termin8: CourseType[];
    termin9: CourseType[];
  }>(propSelectedCourses || loadSelectedCourses());

  // Update local state when props change
  useEffect(() => {
    if (propSelectedCourses) {
      setSelectedCourses(propSelectedCourses);
    }
  }, [propSelectedCourses]);

  // Map index to termin
  const getTerminKey = (index: number): Term => {
    const terminMap: Record<number, Term> = {
      0: "termin7",
      1: "termin8",
      2: "termin9",
    };
    return terminMap[index] || "termin7";
  };

  const terminKey = getTerminKey(index);

  // Get all courses for this termin, organized by semesterName if using grouped courses
  const getCoursesForSemester = () => {
    if (groupedCourses && groupedCourses.size > 0) {
      // Return courses grouped by semesterName that belong to this termin
      const coursesForTermin = selectedCourses[terminKey] || [];
      const groupedForTermin = new Map<string, CourseType[]>();

      coursesForTermin.forEach((course) => {
        const semesterName = course.semesterName;
        if (!groupedForTermin.has(semesterName)) {
          groupedForTermin.set(semesterName, []);
        }
        groupedForTermin.get(semesterName)!.push(course);
      });

      return groupedForTermin;
    }

    // Fallback: group courses by semesterName even without grouped courses prop
    const coursesForTermin = selectedCourses[terminKey] || [];
    const grouped = new Map<string, CourseType[]>();

    coursesForTermin.forEach((course) => {
      const semesterName = course.semesterName;
      if (!grouped.has(semesterName)) {
        grouped.set(semesterName, []);
      }
      grouped.get(semesterName)!.push(course);
    });

    return grouped;
  };

  const groupedCoursesForSemester = getCoursesForSemester();

  // Calculate total credits across all semester groups
  const totalCredits = Array.from(groupedCoursesForSemester.values())
    .flat()
    .reduce((sum, course) => sum + Number(course.credits.replace("hp", "").trim()), 0);

  const totalCourseCount = Array.from(groupedCoursesForSemester.values()).flat().length;

  const removeCourse = (courseCode: string) => {
    const updatedCourses = {
      ...selectedCourses,
      [terminKey]: selectedCourses[terminKey].filter((course) => course.course_code !== courseCode),
    };
    setSelectedCourses(updatedCourses);
    saveSelectedCourses(updatedCourses);
  };

  const GetStatus = (studyMap: Map<string, Course> | undefined, course_code: string): Status => {
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
  };

  return (
    <main className="p-4 bg-accent rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
      <button className="grid grid-cols-8 grid-rows-1 items-center w-full" onClick={() => setIsOpen(!isOpen)}>
        <div className="col-start-1 col-span-4 flex gap-4 items-center">
          <div className="border-1 border-foreground rounded-sm h-[1.188rem] aspect-square"></div>
          <h3 className="text-lg font-medium">Termin {index + 7}</h3>
        </div>

        <div className="col-start-5 col-span-2 flex flex-col items-start">
          <p className="text-xs text-gray-600">{semester.fullString.slice(-7)}</p>
          {totalCourseCount > 0 && (
            <p className="text-xs text-gray-500">
              {totalCourseCount} kurser, {totalCredits} hp
            </p>
          )}
        </div>

        <ChevronDown size={24} className={`col-start-8 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      <section>
        {isOpen && (
          <div className="mt-4">
            {/* Display grouped courses */}
            {groupedCoursesForSemester.size > 0 && (
              <div className="mb-4">
                {Array.from(groupedCoursesForSemester.entries()).map(([semesterName, courses]) => (
                  <div key={semesterName} className="mb-4">
                    {/* Semester group header */}
                    <div className="mb-2 px-2">
                      <h4 className="font-medium text-sm text-gray-700">{semesterName}</h4>
                      <div className="w-full h-px bg-secondary mt-1"></div>
                    </div>

                    {/* Courses in this semester group */}
                    <div className="flex flex-col w-full">
                      <div className="flex relative w-full">
                        <div className="absolute left-[0.563rem] top-0 bottom-0 w-px bg-secondary z-0" />
                        <div className="flex flex-col pl-[1.125rem] w-full">
                          {courses.map((course, courseIndex) => {
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
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeCourse(course.course_code);
                                          }}
                                          className="ml-2 p-1 hover:bg-red-100 rounded-full transition-colors"
                                          title="Ta bort kurs">
                                          <X size={16} className="text-red-500" />
                                        </button>
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
                                {courseIndex < courses.length - 1 && (
                                  <div className="pl-8 pr-10">
                                    <Separator />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add course button */}
            <div className="flex items-center pl-4 py-2 gap-2 cursor-pointer hover:underline">
              <CirclePlus size={18} />
              <a href="./dashboard/masterbuilder">
                <p className="text-sm">Lägg till en masterkurs</p>
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
