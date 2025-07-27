'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, X, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import masterData from '@/webscraping/MasterKurser/MasterKurser.json';

// Dynamically import CourseCard with no SSR
const CourseCard = dynamic(() => import('./coursecard'), {
  ssr: false,
  loading: () => <div className="border p-4 rounded-lg">Loading course...</div>
});

type Term = 'termin7' | 'termin8' | 'termin9';

type Course = {
  name: string;
  course_code: string;
  credits: string;
  semesterName: string;
  availableTerms: Term[];
  overview?: {
    education_level?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

const COURSES_PER_PAGE = 30;

export default function AllCoursesPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<{
    termin7: Course[];
    termin8: Course[];
    termin9: Course[];
  }>({ termin7: [], termin8: [], termin9: [] });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const allCourses = useMemo(() => {
    const courseMap = new Map<
      string,
      { course: Omit<Course, 'availableTerms'>; terms: Set<Term> }
    >();

    masterData.programs.forEach(program => {
      program.semesters.forEach(semester => {
        let term: Term | null = null;
        const name = semester.name.toLowerCase();
        if (name.includes('termin 7')) term = 'termin7';
        else if (name.includes('termin 8')) term = 'termin8';
        else if (name.includes('termin 9')) term = 'termin9';
        if (!term) return;

        semester.courses.forEach(course => {
          const existing = courseMap.get(course.course_code);
          if (existing) {
            existing.terms.add(term!);
          } else {
            courseMap.set(course.course_code, {
              course: {
                ...course,
                semesterName: semester.name,
              },
              terms: new Set([term!]),
            });
          }
        });
      });
    });

    return Array.from(courseMap.values())
      .map(({ course, terms }) => {
        const has7 = terms.has('termin7');
        const has8 = terms.has('termin8');
        const has9 = terms.has('termin9');

        let availableTerms: Term[] = [];

        if (has8) {
          availableTerms = ['termin8'];
        } else if (has7 || has9) {
          availableTerms = ['termin7', 'termin9'];
        }

        return {
          ...course,
          availableTerms,
        };
      })
      .filter(Boolean) as Course[];
  }, []);

  const totalPages = Math.ceil(allCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = allCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );
  const totalCredits = Object.values(selectedCourses)
    .flat()
    .reduce((sum, course) => sum + parseFloat(course.credits), 0);

  const CREDIT_GOAL = 90;
  const addToTermin = (termin: Term, course: Course) => {
    setSelectedCourses(prev => ({
      ...prev,
      [termin]: [...prev[termin], { ...course, semesterName: `Termin ${termin.slice(-1)}` }],
    }));
  };

  const advancedLevelCredits = Object.values(selectedCourses)
    .flat()
    .filter(course => course.overview?.education_level === 'Avancerad nivå')
    .reduce((sum, course) => sum + parseFloat(course.credits), 0);

  const ADVANCED_CREDIT_GOAL = 30;
  const ADVANCED_MEDIA_GOAL = 30;
  const ADVANCED_DATA_GOAL = 30;

  let advancedMediaCredits = 0;
  let advancedDataCredits = 0;

  Object.values(selectedCourses)
    .flat()
    .forEach((course) => {
      const level = course.overview?.education_level;
      const subjectsRaw = course.overview?.main_subject;

      if (level === 'Avancerad nivå' && typeof subjectsRaw === 'string') {
        const subjects = subjectsRaw.split(',').map((s: string) => s.trim());

        if (subjects.includes('Medieteknik')) {
          advancedMediaCredits += parseFloat(course.credits);
        }
        if (subjects.includes('Datateknik')) {
          advancedDataCredits += parseFloat(course.credits);
        }
      }
    });

  const removeFromTermin = (termin: Term, courseCode: string) => {
    setSelectedCourses(prev => ({
      ...prev,
      [termin]: prev[termin].filter(c => c.course_code !== courseCode),
    }));
  };

  const ADVANCED_SUBJECT_GOAL = 30;

  function subjectIncludes(course: Course, subject: string) {
    const subjectsRaw = course.overview?.main_subject;
    if (!subjectsRaw) return false;

    if (Array.isArray(subjectsRaw)) {
      return subjectsRaw.includes(subject);
    }

    return subjectsRaw.split(',').map((s: string) => s.trim()).includes(subject);
  }

  const advancedMedieteknikCredits = Object.values(selectedCourses)
    .flat()
    .filter(
      (course) =>
        course.level === 'Avancerad nivå' && subjectIncludes(course, 'Medieteknik')
    )
    .reduce((sum, course) => sum + parseFloat(course.credits), 0);

  const advancedDatateknikCredits = Object.values(selectedCourses)
    .flat()
    .filter(
      (course) =>
        course.level === 'Avancerad nivå' && subjectIncludes(course, 'Datateknik')
    )
    .reduce((sum, course) => sum + parseFloat(course.credits), 0);

  if (!isClient) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {(['termin7', 'termin8', 'termin9'] as Term[]).map((termin) => (
          <Card key={termin}>
            <CardHeader>
              <CardTitle className="text-lg">
                {termin.replace('termin', 'Termin ')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCourses[termin].length === 0 ? (
                <p className="text-sm text-muted-foreground">Inga kurser valda</p>
              ) : (
                <div className="space-y-2">
                  {selectedCourses[termin].map((course) => (
                    <div
                      key={course.course_code}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium text-sm">{course.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.course_code} • {course.credits}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromTermin(termin, course.course_code)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Progression</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <p className="mb-1 text-sm font-medium">
                  Valda poäng: {totalCredits} / {CREDIT_GOAL}
                </p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className="h-3 bg-blue-900 rounded transition-all"
                    style={{
                      width: `${Math.min((totalCredits / CREDIT_GOAL) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="mb-1 text-sm font-medium">
                  Avancerad nivå i Medieteknik: {advancedMediaCredits} / {ADVANCED_MEDIA_GOAL} hp
                </p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className="h-3 bg-blue-900 rounded transition-all"
                    style={{
                      width: `${Math.min((advancedMediaCredits / ADVANCED_MEDIA_GOAL) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="mb-1 text-sm font-medium">
                  Avancerad nivå i Datateknik: {advancedDataCredits} / {ADVANCED_DATA_GOAL} hp
                </p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className="h-3 bg-blue-900 rounded transition-all"
                    style={{
                      width: `${Math.min((advancedDataCredits / ADVANCED_DATA_GOAL) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alla kurser (Termin 7–9)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCourses.map((course) => {
              const isSelected = Object.values(selectedCourses)
                .flat()
                .some((c) => c.course_code === course.course_code);

              return (
                <CourseCard
                  key={`${course.course_code}-${course.semesterName}`}
                  course={course}
                  isSelected={isSelected}
                  onAdd={addToTermin}
                />
              );
            })}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}