'use client';
import { useState } from 'react';
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

export default function AllCoursesPage() {
  const [selectedCourses, setSelectedCourses] = useState<{
    termin7: Course[];
    termin8: Course[];
    termin9: Course[];
  }>({ termin7: [], termin8: [], termin9: [] });

  const courseMap = new Map<
    string,
    { course: Omit<Course, 'availableTerms'>; terms: Set<Term> }
  >();

masterData.programs.forEach(program => {
  program.semesters.forEach(semester => {
    const match = semester.name.match(/Termin (\d)/);
    const termNumber = match ? match[1] : null;

    const term: Term | null =
      termNumber === '7' ? 'termin7' :
      termNumber === '8' ? 'termin8' :
      termNumber === '9' ? 'termin9' :
      null;

    if (!term) return;

    semester.courses.forEach(course => {
      const existing = courseMap.get(course.course_code);
      if (existing) {
        existing.terms.add(term);
      } else {
        courseMap.set(course.course_code, {
          course: {
            ...course,
            semesterName: semester.name,
          },
          terms: new Set([term]),
        });
      }
    });
  });
});

  const allCourses: Course[] = Array.from(courseMap.values()).map(({ course, terms }) => ({
    ...course,
    availableTerms: Array.from(terms),
  }));

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

      {/* Alla kurser */}
      <Card>
        <CardHeader>
          <CardTitle>Alla kurser (Termin 7–9)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allCourses.map((course) => {
              const isSelected = Object.values(selectedCourses)
                .flat()
                .some(c => c.course_code === course.course_code);

              return (
                <div
                  key={course.course_code}
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
                        Tillgänglig i: {course.availableTerms.map(t => t.replace('termin', 'Termin ')).join(', ')}
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
        </CardContent>
      </Card>
    </div>
  );
}
