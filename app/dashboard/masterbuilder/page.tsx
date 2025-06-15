'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import masterData from '@/webscraping/MasterKurser/MasterKurser.json';

type Examination = {
  code: string;
  name: string;
  credits: string;
  grading: string;
};

type Literature = {
  type: string;
  authors?: string;
  title?: string;
  edition?: string;
};

type Overview = {
  main_subject: string;
  education_level: string;
  course_type?: string;
  examiner?: string;
  study_director?: string;
  scheduled_hours?: string;
  self_study_hours?: string;
};

type CoursePlan = {
  learning_objectives: string;
  course_content: string;
  teaching_methods: string;
  grade_scale: string;
  institution: string;
};

type Course = {
  name: string;
  course_code: string;
  credits: string;
  VOF?: string;
  url?: string;
  overview: Overview;
  course_plan: CoursePlan;
  examinations: Examination[];
  literature: Literature[];
};

type Semester = {
  name: string;
  courses: Course[];
};

type Program = {
  name: string;
  credits: string;
  url: string;
  semesters: Semester[];
};

type MasterData = {
  programs: Program[];
};

export default function AllCoursesPage() {
  // Extract all courses from all programs and semesters
  const allCourses = (masterData as MasterData).programs.flatMap(program =>
    program.semesters.flatMap(semester =>
      semester.courses.map(course => ({
        ...course,
        semesterName: semester.name,
        programName: program.name
      }))
    )
  );

  // Group courses by semester for better organization
  const coursesBySemester: Record<string, Course[]> = {};
  allCourses.forEach(course => {
    if (!coursesBySemester[course.semesterName]) {
      coursesBySemester[course.semesterName] = [];
    }
    coursesBySemester[course.semesterName].push(course);
  });

  // Initialize all semesters as expanded by default
  const [expandedSemesters, setExpandedSemesters] = useState<Record<string, boolean>>(
    () => {
      const initialState: Record<string, boolean> = {};
      Object.keys(coursesBySemester).forEach(semesterName => {
        initialState[semesterName] = true;
      });
      return initialState;
    }
  );

  const toggleSemester = (semesterName: string) => {
    setExpandedSemesters(prev => ({
      ...prev,
      [semesterName]: !prev[semesterName]
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Alla kurser</h1>
      <p className="text-muted-foreground mb-8">
        Totalt {allCourses.length} kurser
      </p>

      <div className="space-y-6">
        {Object.entries(coursesBySemester).map(([semesterName, courses]) => (
          <Card key={semesterName}>
            <CardHeader 
              className="flex flex-row items-center justify-between cursor-pointer"
              onClick={() => toggleSemester(semesterName)}
            >
              <CardTitle>{semesterName}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="p-0"
              >
                {expandedSemesters[semesterName] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </Button>
            </CardHeader>

            <CardContent className={!expandedSemesters[semesterName] ? 'hidden' : ''}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <div key={`${course.course_code}-${course.semesterName}`} 
                       className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{course.name}</h4>
                        <p className="text-sm text-muted-foreground">{course.course_code}</p>
                      </div>
                      <span className="text-sm font-medium bg-accent px-2 py-1 rounded">
                        {course.credits}
                      </span>
                    </div>
                    
                    <div className="mt-2 text-xs text-muted-foreground">
                      {course.programName}
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div className="text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-medium">Huvudområde:</span> {course.overview.main_subject}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Nivå:</span> {course.overview.education_level}
                        </p>
                      </div>

                      <div className="text-sm">
                        <h5 className="font-medium">Examinationer</h5>
                        <ul className="mt-1 space-y-1">
                          {course.examinations.map((exam, idx) => (
                            <li key={idx} className="flex justify-between">
                              <span className="text-muted-foreground">{exam.name}</span>
                              <span>{exam.credits}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}