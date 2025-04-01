import { useState } from "react";

interface Course {
  name: string;
  course_code: string;
  credits: string;
}

export default function CourseAccordion({ course }: { course: Course }) {
  const [isOpen, setIsOpen] = useState(false);
}
