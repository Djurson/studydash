import { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";

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

export default function CardLoading({ children }: { children?: ReactNode }) {
  return (
    <>
      <main className="p-4 bg-card rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.04)] w-full h-full duration-300 hover:scale-102 hover:shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.1)] flex flex-col justify-between items-start gap-4">
        <header className="flex items-center cursor-pointer hover:underline w-full h-fit">
          <Skeleton className="w-4/5 h-6" />
        </header>
        <section className="w-full h-11/12">{children ? children : <Skeleton className="w-full h-full" />}</section>
      </main>
    </>
  );
}
