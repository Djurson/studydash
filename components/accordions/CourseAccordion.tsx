import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface Course {
  name: string;
  course_code: string;
  credits: string;
  VOF: string;
}

export default function CourseAccordion({ course }: { course: Course }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden pl-4">
      <button
        className="w-full text-left flex justify-between items-center py-2"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4 items-center">
            <div className="border-1 border-gray-900 rounded-sm h-[1rem] aspect-square"></div>
            <h4 className="font-medium text-sm">
              {course.name} - {course.course_code}
            </h4>
          </div>

          <p className="text-xs text-gray-600">0/{course.credits}</p>
          <div className="h-[1.625rem] w-[5.375rem] bg-emerald-200 rounded-2xl items-center justify-center">
            <p className="text-center">Betyg 5</p>
          </div>
          <ChevronDown
            size={24}
            className={`transition-transform duration-200 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="p-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold mb-2">Course Overview</h5>
            </div>
            <div>
              <p>View Course Details</p>
            </div>
          </div>
        </div>
      )}
      <Separator />
    </div>
  );
}
