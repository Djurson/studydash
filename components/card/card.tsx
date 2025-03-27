import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Utility for merging class names
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type CardProps = {
  cardTitle: string;
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
  cardTitle,
}: CardProps) {
  return (
    <>
      <main className="p-4 bg-white rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
        <header className="flex items-center">
          <p className="text-lg">{cardTitle}</p>
          <ChevronRight size={24} />
        </header>
        <section> {children}</section>
      </main>
    </>
  );
}
