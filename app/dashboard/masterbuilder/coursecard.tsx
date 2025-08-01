'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Plus, ChevronDown, BookOpen, GraduationCap } from 'lucide-react';

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

 
  const getMainSubjects = () => {
    const subjects = course.overview?.main_subject;
    if (!subjects) return [];
    if (Array.isArray(subjects)) return subjects;
 
    return subjects.split(',,').map((s: string) => s.trim()).filter(s => s.length > 0);
  };


  const getEducationLevel = () => {
    const level = course.overview?.education_level;
    if (level === 'Avancerad nivå') return 'Avancerad';
    if (level === 'Grundnivå') return 'Grund';
    return level || 'Okänd';
  };


  const getLevelColor = () => {
    const level = course.overview?.education_level;
    if (level === 'Avancerad nivå') return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
    if (level === 'Grundnivå') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
  };


  const getSubjectColor = (subject: string) => {
    if (subject === 'Datateknik') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
    if (subject === 'Medieteknik') return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
    if (subject === 'Industriell ekonomi') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
  };

  const mainSubjects = getMainSubjects();
  const educationLevel = getEducationLevel();

  return (
    <div
      className={`p-4 rounded-xl bg-card text-card-foreground border border-border dark:border-muted shadow-sm transition-all duration-200 ${
        isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:shadow-md'
      }`}
    >
      <div className="space-y-3">
        {/* Header with title and credits */}
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm leading-tight line-clamp-2">{course.name}</h4>
            <p className="text-sm text-muted-foreground font-mono">{course.course_code}</p>
          </div>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <BookOpen className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm font-medium">{course.credits}</span>
          </div>
        </div>

        {/* Education level and subjects */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${getLevelColor()}`}>
            <GraduationCap className="h-3 w-3 mr-1" />
            {educationLevel}
          </Badge>
          {mainSubjects.map((subject, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className={`text-xs px-2 py-0.5 ${getSubjectColor(subject)}`}
            >
              {subject}
            </Badge>
          ))}
        </div>

  
        <div className="text-xs text-muted-foreground">
          <span className="font-medium">Tillgänglig:</span>{' '}
          {course.availableTerms.map((t, index) => (
            <span key={t}>
              {t.replace('termin', 'T')}
              {index < course.availableTerms.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

     
        {!isSelected && (
          <div className="flex justify-end pt-1">
            {course.availableTerms.length > 1 ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Lägg till
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end"
                  avoidCollisions={true}
                  collisionPadding={10}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
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
                className="h-7 text-xs"
                onClick={() => onAdd(course.availableTerms[0], course)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Lägg till
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;