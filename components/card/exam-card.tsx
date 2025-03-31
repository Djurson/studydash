import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Utility for merging class names
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { type } from "os";

type CardProps = {
  courseName: string;
  courseCode: string;
  date: string;
  type: string;
  points: string;
  variant?: "default" | "compact" | "large";
  children?: ReactNode;
};

// const variants = cva(
//     "big": "text-base",
//     "small": " text-sm"
// );

/**
 * A card component that displays course-related information in a styled box.
 * 
 * @param courseName - The name of the course to be displayed at the top of the card.
 * @param courseCode - The course code to be displayed beneath the course name.
 * @param date - The date associated with the course.
 * @param type - The type of the course (e.g., lecture, seminar).
 * @param points - The number of points the course offers.
 * @param variant - Defines the style of the card. Can be "default", "compact", or "large". Default is "default".
 * @param children - Optional content to be displayed in the footer of the card.
 * 
 * @returns A card component displaying the course information with optional custom content in the footer.
 * 
 * @example
 * <Card 
 *   courseName="Introduction to Programming" 
 *   courseCode="CS101" 
 *   date="2023-09-01" 
 *   type="Lecture" 
 *   points="5"
 * >
 *   <button>View Details</button>
 * </Card>
 */

export default function Card({
  variant = "default",
  children,
  courseName,
  courseCode,
  date,
  type,
  points,
}: CardProps) {
  return (
    <>
      <main className="shrink-0 p-4 bg-white rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-[13.625rem] h-full">
        <header className="flex items-center">
          <p className="text-sm font-semibold">{courseName}</p>
        </header>
        <section className="mt-4 flex flex-col gap-2 text-xs text-gray-600 font-normal">
          <div className="flex justify-between">
            <p>{courseCode}</p>
            <p>{date}</p>
          </div>
          <div className="flex justify-between">
            <p>{type}</p>
            <p>{points} hp</p>
          </div>
        </section>
        <footer className="mt-4"> {children}</footer>
      </main>
    </>
  );
}
