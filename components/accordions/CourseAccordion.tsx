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
    <div className="overflow-hidden ">
      <button
        className="grid grid-cols-10 grid-rows-1 w-full text-left items-center py-2"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="col-start-1 col-span-5 pl-4 flex gap-4 items-center">
          <div className="border-1 border-gray-900 rounded-sm h-[1rem] aspect-square"></div>
          <h4 className="font-medium text-sm">
            {course.name} - {course.course_code}
          </h4>
        </div>
        <p className="col-start-6 col-span-2 text-xs text-gray-600">
          xxxx-xx-xx
        </p>
        <p className="col-start-8 col-span-1 text-xs text-gray-600">
          0/{course.credits}
        </p>
        <div className="h-[1.625rem] w-[5.375rem] bg-emerald-200 rounded-2xl items-center justify-center">
          <p className="text-center">Betyg 5</p>
        </div>
        <ChevronDown
          size={24}
          className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
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
      <div className="pl-4">
        <Separator />
      </div>
    </div>
  );
}
