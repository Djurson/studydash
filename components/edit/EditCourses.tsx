import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface Course {
  name: string;
  course_code: string;
  credits: string;
  VOF: string;
  examinations: Examination[];
}

interface Examination {
  code: string;
  name: string;
  credits: string;
  grading: string;
}

export default function EditCourses({ course }: { course: Course }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden ">
      <button
        className="grid grid-cols-10 grid-rows-1 w-full text-left items-center py-2"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="col-start-1 col-span-5 flex gap-4 items-center pl-4">
          <div className="flex">
            <div className="border-1 border-gray-900 rounded-sm h-[1rem] aspect-square"></div>
          </div>

          <h4 className="font-medium text-sm">
            {course.name} - {course.course_code}
          </h4>
        </div>
        <p className="col-start-6 col-span-2 text-xs text-gray-600 ">
          xxxx-xx-xx
        </p>
        <p className="col-start-8 col-span-1 text-xs text-gray-600 ">
          0/{course.credits}
        </p>

        <ChevronDown
          size={24}
          className={`col-start-10 justify-self-end transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <section>
        {isOpen && (
          <div className=" overflow-hidden bg-white">
            {course.examinations.map((exam) => (
              <div key={exam.code}>
                <div className="grid grid-cols-10 grid-rows-1 w-full text-left items-center py-2">
                  <div className="col-start-1 col-span-5 flex gap-4 items-center">
                    <div className="flex pl-8">
                      <div className="border-1 border-gray-900 rounded-sm h-[1rem] aspect-square"></div>
                    </div>

                    <p className="font-regular text-xs">
                      {exam.name} - {exam.code}
                    </p>
                  </div>
                  <p className="col-start-6 col-span-2 text-xs text-gray-600">
                    xxxx-xx-xx
                  </p>
                  <p className="col-start-8 col-span-1 text-xs text-gray-600">
                    {parseFloat(exam.credits) > 0 && `0/${exam.credits}`}
                  </p>
                </div>
                <div className="pl-8 last:invisible">
                  <Separator />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="pl-4">
        <Separator />
      </div>
    </div>
  );
}
