'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import masterData from '@/webscraping/MasterKurser/MasterKurser.json';

type Term = 'termin7' | 'termin8' | 'termin9';

type Course = {
  name: string;
  course_code: string;
  credits: string;
  semesterName: string;
  availableTerms: Term[];
};

const COURSES_PER_PAGE = 30;

export default function AllCoursesPage() {
  const [selectedCourses, setSelectedCourses] = useState<{
    termin7: Course[];
    termin8: Course[];
    termin9: Course[];
  }>({ termin7: [], termin8: [], termin9: [] });

  const [currentPage, setCurrentPage] = useState(1);

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

  const addToTermin = (termin: Term, course: Course) => {
    setSelectedCourses(prev => ({
      ...prev,
      [termin]: [...prev[termin], { ...course, semesterName: `Termin ${termin.slice(-1)}` }],
    }));
  };

  const removeFromTermin = (termin: Term, courseCode: string) => {
    setSelectedCourses(prev => ({
      ...prev,
      [termin]: prev[termin].filter(c => c.course_code !== courseCode),
    }));
  };

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
                .some(c => c.course_code === course.course_code);

              return (
                <div
                  key={`${course.course_code}-${course.semesterName}`}
                  className={`border p-4 rounded-lg hover:shadow-md transition-all ${
                    isSelected
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer hover:border-blue-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.course_code}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tillgänglig i:{' '}
                        {course.availableTerms.map(t => t.replace('termin', 'Termin ')).join(', ')}
                      </p>
                    </div>
                    <span className="text-sm font-medium bg-accent px-2 py-1 rounded">
                      {course.credits}
                    </span>
                  </div>

                  {!isSelected && (
                    <div className="mt-2 flex justify-end">
                      {course.availableTerms.length > 1 ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6">
                              <Plus className="h-3 w-3 mr-1" />
                              Lägg till
                              <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {course.availableTerms.map((term) => (
                              <DropdownMenuItem
                                key={term}
                                onClick={() => addToTermin(term, course)}
                              >
                                Lägg till i {term.replace('termin', 'Termin ')}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6"
                          onClick={() => addToTermin(course.availableTerms[0], course)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Lägg till
                        </Button>
                      )}
                    </div>
                  )}
                </div>
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
