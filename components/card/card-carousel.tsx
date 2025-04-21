"use client";

import { useRef, useState, useEffect } from "react";
import { CircleAlert } from "lucide-react"
// Define the type for a single slide
type CardProps = {
  variant?: "default" | "programWindow";
};

interface Slide {
  position: string;
  courseName: string;
  courseCode: string;
  date: string;
  type: string;
  points: string;
}

// Typed slides array
const slides: Slide[] = [
  {
    position: "1.",
    courseName: "test",
    courseCode: "test",
    date: "00-00-00",
    type: "test",
    points: "test",
  },
  {
    position: "2.",
    courseName: "test",
    courseCode: "test",
    date: "00-00-00",
    type: "test",
    points: "test",
  },
  {
    position: "3.",
    courseName: "test",
    courseCode: "test",
    date: "00-00-00",
    type: "test",
    points: "test",
  },
  {
    position: "4.",
    courseName: "test",
    courseCode: "test",
    date: "00-00-00",
    type: "test",
    points: "test",
  },
  {
    position: "5.",
    courseName: "test",
    courseCode: "test",
    date: "00-00-00",
    type: "test",
    points: "test",
  },
  {
    position: "6.",
    courseName: "test",
    courseCode: "test",
    date: "00-00-00",
    type: "test",
    points: "test",
  },
  {
    position: "7.",
    courseName: "test",
    courseCode: "test",
    date: "00-00-00",
    type: "test",
    points: "test",
  },
];

/**
 * A carousel component that displays a list of course slides in a horizontally scrollable view.
 * 
 * @remarks
 * The carousel shows multiple slides, each containing information about a specific course. 
 * The slides can be navigated horizontally. Each slide contains details such as course name, code, date, type, and points.
 * 
 * @returns A horizontally scrollable carousel of course slides.
 */

export default function CardCarousel({variant = "default"}: CardProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const carouselRef = useRef<HTMLUListElement | null>(null);

  return (
    <>
      <ul
        className="flex w-full overflow-x-auto drop-shadow-[2px_4px_12px_rgba(0,0,0,0.08)] px-regular snap-mandatory snap-x scroll-smooth container-snap no-scrollbar"
        ref={carouselRef}>
        {slides.map((slide, index) => (
          <li
            className={`${variant === "programWindow" ? "h-20 my-2 p-2 w-[11rem]": "h-full my-4 p-4 w-[13.625rem]" }  mr-4 last:mr-0 bg-accent rounded-2xl shrink-0 shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] snap-start snap-normal´} 
              ${index === 0 ? "snap-start" : ""} 
              ${index === slides.length - 1 ? "snap-end" : ""}`}
            key={slide.position}>
            <header className="flex items-center">
              <p className="text-sm font-semibold">{variant === "programWindow" ? "": slide.courseName}</p>
            </header>
            <section className="mt-4 flex flex-col gap-2 text-xs text-gray-600 font-normal">
              <div className="flex justify-between">
                <p>{variant === "programWindow" ? "" : slide.courseCode}</p>
                <p>{variant === "programWindow" ? "" : slide.date}</p>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-row items-center gap-1">
                  {variant === "programWindow" ?<CircleAlert color="#f36961"/> : ""}
                  <p className="h-fit">{slide.type}</p>
                </div>
                <p>{slide.points} hp</p>
              </div>
            </section>
            <footer>{variant==="programWindow"? "" : "footer"}</footer>
          </li>
        ))}
      </ul>
    </>
  );
}
