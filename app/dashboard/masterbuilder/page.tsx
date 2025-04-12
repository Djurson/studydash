
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import masterData from '@/webscraping/mastercourses.json';

type Course = {
  name: string;
  course_code: string;
  credits: string;
  overview: {
    main_subject: string;
    education_level: string;
  };
};

type Period = {
  name: string;
  courses: Course[];
};

type Semester = {
  name: string;
  periods: Period[];
};

type Program = {
  name: string;
  credits: string;
  url: string;
  semesters: Semester[];
};

export default function MasterBuilderPage() {
  const [expandedSemesters, setExpandedSemesters] = useState<Record<string, boolean>>({});

  const program = masterData.programs[0] as Program;

  const toggleSemester = (semesterName: string) => {
    setExpandedSemesters(prev => ({
      ...prev,
      [semesterName]: !prev[semesterName]
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{program.name}</h1>
      <p className="text-muted-foreground mb-8">{program.credits}</p>
      
      <div className="space-y-6">
        {program.semesters.map((semester) => (
          <Card key={semester.name}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{semester.name}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSemester(semester.name)}
              >
                <Pencil className="w-4 h-4 mr-2" />
                {expandedSemesters[semester.name] ? 'Close' : 'Edit'}
              </Button>
            </CardHeader>
            
            {expandedSemesters[semester.name] && (
              <CardContent>
                <div className="space-y-4">
                  {semester.periods.map((period) => (
                    <div key={period.name} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">{period.name}</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {period.courses.map((course) => (
                          <div key={course.course_code} className="border p-4 rounded-lg">
                            <h4 className="font-medium">{course.name}</h4>
                            <div className="text-sm text-muted-foreground mt-2 space-y-1">
                              <p><span className="font-semibold">Kurskod:</span> {course.course_code}</p>
                              <p><span className="font-semibold">Utbildningsnivå:</span> {course.overview.education_level}</p>
                              <p><span className="font-semibold">Huvudområde:</span> {course.overview.main_subject}</p>
                              <p><span className="font-semibold">Högskolepoäng:</span> {course.credits}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}