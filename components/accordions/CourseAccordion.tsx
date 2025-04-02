import { useState } from "react";

interface Course {
  name: string;
  course_code: string;
  credits: string;
  VOF: string;
}

export default function CourseAccordion({ course }: { course: Course }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-3 overflow-hidden">
      <button
        className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h4 className="font-medium">
            {course.name} ({course.course_code})
          </h4>
          <p className="text-sm text-gray-600">{course.credits}</p>
        </div>
        <span>{isOpen ? "−" : "+"}</span>
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
    </div>
  );
}
