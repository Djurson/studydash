import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Utility for merging class names
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type CardProps = {
  cardTitle: string;
  variant?: "default" | "compact" | "large" | "header" | "no-header";
  children?: ReactNode;
};

// const variants = cva(
//     "big": "text-base",
//     "small": " text-sm"
// );

/**
 * A flexible card component that can display different types of content with optional title and variant styling.
 * 
 * @param cardTitle - The title to be displayed at the top of the card.
 * @param variant - Defines the card's style variant. Can be "default", "compact", "large", "header", or "no-header".
 * @param children - The content to be displayed inside the card.
 * 
 * @returns A styled card with optional header and variant styles, containing the provided children content.
 * 
 * @example
 * <Card cardTitle="Example Title" variant="large">
 *   <p>This is an example of the card content.</p>
 * </Card>
 */

export default function Card({
  variant = "default",
  children,
  cardTitle,
}: CardProps) {
  return (
    <>
<main className="p-4 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
<header className="flex items-center">
          <p className="text-lg">{cardTitle}</p>
          {variant === "header" ? <ChevronRight size={24} /> : ""}
        </header>
        <section> {children}</section>
      </main>
    </>
  );
}
