'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { PillbuttonContainer } from '@/components/main/pillbutton';

import masterData from '@/webscraping/MasterKurser/MasterKurser.json';


type FilterType = {
  type: 'term' | 'area' | 'level';
  value: string;
  label: string;
};


const saveSelectedCourses = (courses: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('selectedCourses', JSON.stringify(courses));
  }
};

const loadSelectedCourses = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('selectedCourses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.termin7 && parsed.termin8 && parsed.termin9) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved courses', e);
      }
    }
  }
  return { termin7: [], termin8: [], termin9: [] };
};

const CourseCard = dynamic(() => import('./coursecard'), {
  ssr: false,
  loading: () => <div className="border p-4 rounded-lg animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
  </div>
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
    main_subject?: string | string[];
    [key: string]: any;
  };
  [key: string]: any;
};

const COURSES_PER_PAGE = 30;


const CREDIT_GOAL = 90;
const ADVANCED_CREDIT_GOAL = 30;
const ADVANCED_MEDIA_GOAL = 30;
const ADVANCED_DATA_GOAL = 30;


const TERM_LABELS = {
  termin7: 'Termin 7',
  termin8: 'Termin 8',
  termin9: 'Termin 9'
} as const;

export default function AllCoursesPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<{
    termin7: Course[];
    termin8: Course[];
    termin9: Course[];
  }>(loadSelectedCourses());

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      saveSelectedCourses(selectedCourses);
    }
  }, [selectedCourses, isClient]);


  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);


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


  const subjectIncludes = useCallback((course: Course, subject: string) => {
    const subjectsRaw = course.overview?.main_subject;
    if (!subjectsRaw) return false;

    if (Array.isArray(subjectsRaw)) {
      return subjectsRaw.includes(subject);
    }

    return subjectsRaw.split(',').map((s: string) => s.trim()).includes(subject);
  }, []);


  const filteredCourses = useMemo(() => {
    if (selectedFilters.length === 0) return allCourses;
    
    return allCourses.filter(course => {
      return selectedFilters.every(filter => {
        if (filter.type === 'term') return course.availableTerms.includes(filter.value as Term);
        if (filter.type === 'level') {
          if (filter.value === 'Avancerad') return course.overview?.education_level === 'Avancerad nivå';
          if (filter.value === 'Grund') return course.overview?.education_level === 'Grundnivå';
        }
        if (filter.type === 'area') return subjectIncludes(course, filter.value);
        return true;
      });
    });
  }, [allCourses, selectedFilters, subjectIncludes]);


  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = useMemo(() => {
    return filteredCourses.slice(
      (currentPage - 1) * COURSES_PER_PAGE,
      currentPage * COURSES_PER_PAGE
    );
  }, [filteredCourses, currentPage]);


  const creditStats = useMemo(() => {
    const allSelectedCourses = Object.values(selectedCourses).flat();
    
    const totalCredits = allSelectedCourses.reduce((sum, course) => sum + parseFloat(course.credits), 0);
    
    let advancedMediaCredits = 0;
    let advancedDataCredits = 0;

    allSelectedCourses.forEach((course) => {
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

    return {
      totalCredits,
      advancedMediaCredits,
      advancedDataCredits
    };
  }, [selectedCourses]);


  const addToTermin = useCallback((termin: Term, course: Course) => {
    setSelectedCourses(prev => ({
      ...prev,
      [termin]: [...prev[termin], { ...course, semesterName: TERM_LABELS[termin] }],
    }));
  }, []);

  const removeFromTermin = useCallback((termin: Term, courseCode: string) => {
    setSelectedCourses(prev => ({
      ...prev,
      [termin]: prev[termin].filter(c => c.course_code !== courseCode),
    }));
  }, []);


  const selectedCourseCodes = useMemo(() => {
    return new Set(Object.values(selectedCourses).flat().map(c => c.course_code));
  }, [selectedCourses]);


  const ProgressBar = ({ current, goal, label }: { current: number; goal: number; label: string }) => (
    <div className="w-full">
      <p className="mb-1 text-sm font-medium">
        {label}: {current} / {goal} hp
      </p>
      <div className="w-full bg-gray-200 h-3 rounded">
        <div
          className="h-3 bg-blue-900 rounded transition-all"
          style={{
            width: `${Math.min((current / goal) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  );

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
                {TERM_LABELS[termin]}
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
                      className="flex items-center justify-between p-2 rounded border border-border dark:border-muted"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{course.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.course_code} • {course.credits} hp
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromTermin(termin, course.course_code)}
                        className="flex-shrink-0 ml-2"
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


        <div className="col-span-1 md:col-span-3 space-y-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <ProgressBar 
              current={creditStats.totalCredits} 
              goal={CREDIT_GOAL} 
              label="Valda poäng" 
            />
            <ProgressBar 
              current={creditStats.advancedMediaCredits} 
              goal={ADVANCED_MEDIA_GOAL} 
              label="Avancerad nivå i Medieteknik" 
            />
            <ProgressBar 
              current={creditStats.advancedDataCredits} 
              goal={ADVANCED_DATA_GOAL} 
              label="Avancerad nivå i Datateknik" 
            />
          </div>
        </div>
      </div>


      <PillbuttonContainer 
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        variant="course-filter"
      />


      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Alla kurser (Termin 7–9)</span>
            <span className="text-sm font-normal text-muted-foreground">
              {filteredCourses.length} kurser
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCourses.map((course) => {
              const isSelected = selectedCourseCodes.has(course.course_code);

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
          
       
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Föregående
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = index + 1;
                } else if (currentPage <= 3) {
                  pageNum = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + index;
                } else {
                  pageNum = currentPage - 2 + index;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Nästa
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}