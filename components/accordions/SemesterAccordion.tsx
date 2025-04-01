import { Hedvig_Letters_Sans } from "next/font/google";
import { useState } from "react";
import Header from "../supabase-template/hero";

interface Semester {
  name: string;
  courses: Course[];
}

interface Course {
  name: string;
  course_code: string;
  credits: string;
}

export default function SemesterAccordion({
  semester,
}: {
  semester: Semester;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <button>
        <header></header>
      </button>
    </main>
  );
}
