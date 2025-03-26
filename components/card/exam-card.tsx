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
      <main className="p-4 bg-white rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
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
