"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const headerHeight = 80; // height of spacing/top-navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          setTimeout(() => {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }, 100);
        }
      }
    };

    handleScroll();
    window.addEventListener("hashchange", handleScroll);

    return () => window.removeEventListener("hashchange", handleScroll);
  }, [pathname, searchParams]);

  return <>{children}</>;
}
