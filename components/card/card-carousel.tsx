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
  let index = 0;


  return (
    <>
      <ul
        className="flex w-full overflow-x-auto drop-shadow-[2px_4px_12px_rgba(0,0,0,0.08)] px-regular snap-mandatory snap-x scroll-smooth container-snap no-scrollbar"
        ref={carouselRef}>
        {exam.forEach((examItem:any, key:any) => {
          <li
            className={`${variant === "programWindow" ? "h-20 my-2 p-2 w-[11rem]" : "h-full my-4 p-4 w-[13.625rem]"}  mr-4 last:mr-0 bg-accent rounded-2xl shrink-0 shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] snap-start snap-normal´} 
              ${index === 0 ? "snap-start" : ""} 
              ${index === exam.length - 1 ? "snap-end" : ""}`}
            key={key}>
            <section className="mt-4 flex flex-col gap-2 text-xs text-gray-600 font-normal">
              <div className="flex justify-between">
                <div className="flex flex-row items-center gap-1">
                  <CircleAlert color="#f36961" />
                  <p className="h-fit">{examItem.name}</p>
                </div>
                <p>{examItem.credits} hp</p>
              </div>
            </section>
          </li>
          {index++;}
        })}
      </ul>
    </>
  );
}
