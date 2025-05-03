import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Utility for merging class names
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type CardProps = {
  cardTitle: string;
  variant?: "default" | "compact" | "large" | "header" | "no-header";
  children?: ReactNode;
  href?: string;
  sectionId?: string;
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

export default function Card({ variant = "default", children, cardTitle, href, sectionId }: CardProps) {
  const baseClasses = "p-4 bg-card rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.04)] w-full h-full duration-300";
  const hoverClasses = variant === "no-header" ? "" : "hover:scale-[1.02] hover:shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.1)]";
  const headerContent = (
    <header className="flex items-center cursor-pointer group">
      <p className="text-lg group-hover:underline transition duration-300">{cardTitle}</p>
      {variant === "header" && <ChevronRight size={24} className="ml-1 transition-all duration-200 transform group-hover:translate-x-1.5" />}
    </header>
  );

  return (
    <>
      <main className={`${baseClasses} ${hoverClasses}`}>
        {variant !== "no-header" &&
          (href ? (
            <Link href={`${href}${sectionId ? `#${sectionId}` : ""}`} scroll={false}>
              {headerContent}
            </Link>
          ) : (
            headerContent
          ))}
        <section> {children}</section>
      </main>
    </>
  );
}
