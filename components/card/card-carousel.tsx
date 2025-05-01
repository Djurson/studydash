"use client";

import { useRef, useState, useEffect } from "react";
import { CircleAlert } from "lucide-react"
import { Examination, WithAuthProps } from "@/utils/types";
// Define the type for a single slide
// Typed slides array

/**
 * A carousel component that displays a list of course slides in a horizontally scrollable view.
 * 
 * @remarks
 * The carousel shows multiple slides, each containing information about a specific course. 
 * The slides can be navigated horizontally. Each slide contains details such as course name, code, date, type, and points.
 * 
 * @returns A horizontally scrollable carousel of course slides.
 */

export default function CardCarousel({exam}: {exam: any}) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const carouselRef = useRef<HTMLUListElement | null>(null);
  const variant = "programWindow";
  return (
    <>
      <ul
        className="flex w-full overflow-x-auto drop-shadow-sm px-regular snap-mandatory snap-x scroll-smooth container-snap no-scrollbar"
        ref={carouselRef}>
        {exam.map((examItem:any, index:any) => (
          <li
            key={index}
            className={`h-13 my-2 p-2 w-[10rem] mr-2 last bg-accent rounded-2xl shrink-0 snap-start snap-normal flex items-center
              ${index === 0 ? "snap-start" : ""} 
              ${index === exam.length - 1 ? "snap-end" : ""}`}>
            <section className="flex flex-col w-full gap-2 text-xs text-gray-600 font-normal">
              <div className="flex justify-between">
                <div className="flex flex-row items-center gap-1">
                  <CircleAlert color="#f36961" />
                  <p className="h-fit">{examItem.name}</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <p>{examItem.credits}</p> 
                </div>
              </div>
            </section>
          </li>
        ))}
      </ul>
    </>
  );
}
