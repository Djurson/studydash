'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Plus, ChevronDown } from 'lucide-react';

type Term = 'termin7' | 'termin8' | 'termin9';

export type Course = {
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

interface CourseCardProps {
  course: Course;
  isSelected: boolean;
  onAdd: (term: Term, course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isSelected, onAdd }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="border p-4 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-500 rounded w-1/2 mb-3"></div>
          <div className="h-3 bg-gray-500 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

return (
  <div
    className={`p-4 rounded-xl bg-card text-card-foreground border border-border dark:border-muted shadow-sm ${
      isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary'
    }`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-medium">{course.name}</h4>
        <p className="text-sm text-muted-foreground">{course.course_code}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Tillgänglig i:{' '}
          {course.availableTerms.map((t) => t.replace('termin', 'Termin ')).join(', ')}
        </p>
      </div>
      <span className="text-sm font-medium px-2 py-1 rounded">{course.credits}</span>
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
                <DropdownMenuItem key={term} onClick={() => onAdd(term, course)}>
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
            onClick={() => onAdd(course.availableTerms[0], course)}
          >
            <Plus className="h-3 w-3 mr-1" />
            Lägg till
          </Button>
        )}
      </div>
    )}
  </div>
);
};

export default CourseCard;