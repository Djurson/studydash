'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import masterData from '@/webscraping/MasterKurser/MasterKurser.json';

type Course = {
  name: string;
  course_code: string;
  credits: string;
  semesterName: string;
};

export default function AllCoursesPage() {
  // State for selected courses in each termin
  const [selectedCourses, setSelectedCourses] = useState<{
    termin7: Course[];
    termin8: Course[];
    termin9: Course[];
  }>({ termin7: [], termin8: [], termin9: [] });

  // Extract all courses
  const allCourses = masterData.programs.flatMap(program =>
    program.semesters.flatMap(semester =>
      semester.courses.map(course => ({
        ...course,
        semesterName: semester.name
      }))
    )
  );

  // Group courses by semester
  const coursesBySemester: Record<string, Course[]> = {};
  allCourses.forEach(course => {
    if (!coursesBySemester[course.semesterName]) {
      coursesBySemester[course.semesterName] = [];
    }
    coursesBySemester[course.semesterName].push(course);
  });

  // Add course to a termin
  const addToTermin = (termin: 'termin7' | 'termin8' | 'termin9', course: Course) => {
    setSelectedCourses(prev => ({
      ...prev,
      [termin]: [...prev[termin], course]
    }));
  };

  // Remove course from termin
  const removeFromTermin = (termin: string, courseCode: string) => {
    setSelectedCourses(prev => ({
      ...prev,
      [termin]: prev[termin as keyof typeof prev].filter(c => c.course_code !== courseCode)
    }));
  };

  return (
    <div className="container mx-auto py-8">
      {/* Termin Selection Cards (Top) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {['termin7', 'termin8', 'termin9'].map((termin) => (
          <Card key={termin} className="min-h-40">
            <CardHeader>
              <CardTitle className="text-lg">
                {termin.replace('termin', 'Termin ')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCourses[termin as keyof typeof selectedCourses].length === 0 ? (
                <p className="text-sm text-muted-foreground">Inga kurser valda</p>
              ) : (
                <div className="space-y-2">
                  {selectedCourses[termin as keyof typeof selectedCourses].map((course) => (
                    <div key={course.course_code} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-sm">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.course_code} • {course.credits}</p>
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

      {/* All Courses List */}
      <div className="space-y-6">
        {Object.entries(coursesBySemester).map(([semesterName, courses]) => (
          <Card key={semesterName}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{semesterName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => {
                  const isSelected = Object.values(selectedCourses)
                    .flat()
                    .some(c => c.course_code === course.course_code);

                  return (
                    <div 
                      key={`${course.course_code}-${semesterName}`}
                      className={`border p-4 rounded-lg hover:shadow-md transition-all ${
                        isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-500'
                      }`}
                      onClick={() => {
                        if (isSelected) return;
                        // Determine which termin to add to based on semester
                        const termin = semesterName.includes('7') ? 'termin7' :
                                      semesterName.includes('8') ? 'termin8' : 'termin9';
                        addToTermin(termin, course);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{course.name}</h4>
                          <p className="text-sm text-muted-foreground">{course.course_code}</p>
                        </div>
                        <span className="text-sm font-medium bg-accent px-2 py-1 rounded">
                          {course.credits}
                        </span>
                      </div>
                      {!isSelected && (
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm" className="h-6">
                            <Plus className="h-3 w-3 mr-1" />
                            Lägg till
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}