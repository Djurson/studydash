"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Separator } from "../ui/separator";
import { Course, Examination } from "@/utils/types";
import { StatusSquare } from "./statussquare";
import { useStudyResult } from "./editcontext";

type CourseInputProps = {
  name: string;
  course_code: string;
  credits: string;
  VOF: string;
  examinations: ExaminationProps[];
};

type ExaminationProps = {
  code: string;
  name: string;
  credits: string;
  grading: string;
};

export function EditCourse({ course }: { course: CourseInputProps }) {
  const { studyResults, setStudyResults } = useStudyResult();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="overflow-hidden ">
        <button className="grid grid-cols-10 grid-rows-1 w-full text-left items-center py-2" onClick={() => setIsOpen(!isOpen)}>
          <div className="col-start-1 col-span-9 flex gap-4 items-center pl-4">
            <StatusSquare status="none" />

            <h4 className="font-medium text-sm">
              {course.name} - {course.course_code}
            </h4>
          </div>

          <ChevronDown size={24} className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </button>
        <section>
          {isOpen &&
            course.examinations.map((exam) => {
              return <CourseExaminationMapping key={exam.code} examination={exam} courseCode={course.course_code} />;
            })}
        </section>
        <Separator />
      </div>
    </>
  );
}

function CourseExaminationMapping({ examination, courseCode }: { examination: ExaminationProps; courseCode: string }) {
  return (
    <div className="flex w-full text-left items-center py-2 pr-8">
      <StatusSquare />
    </div>
  );
}

/**
 * <button
        className="grid grid-cols-10 grid-rows-1 w-full text-left items-center py-2"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="col-start-1 col-span-9 flex gap-4 items-center pl-4">
          <div className="flex">
            <div className="border-1 border-gray-900 rounded-sm h-[1rem] aspect-square"></div>
          </div>

          <h4 className="font-medium text-sm">
            {course.name} - {course.course_code}
          </h4>
        </div>

        <ChevronDown
          size={24}
          className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
 */
