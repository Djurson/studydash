// components/utils/ScrollHandler.tsx
"use client"; // <-- Make this a Client Component

import { useEffect } from "react";

export function ScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Use a timeout to ensure the element is definitely rendered
      // Often not strictly necessary, but can help with complex layouts or slow renders
      const timer = setTimeout(() => {
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          // Use scrollIntoView. 'block: "start"' aligns the top of the element
          // with the top of the scroll container, respecting scroll-padding-top.
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); // Adjust timeout if needed, 0 might even work

      // Cleanup the timer if the component unmounts before timeout fires
      return () => clearTimeout(timer);
    }
    // Run this effect only once when the component mounts after navigation
  }, []); // Empty dependency array ensures it runs once on mount

  // This component doesn't render anything visible
  return null;
}
