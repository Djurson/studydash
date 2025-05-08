"use client";
import { ChevronLeft } from "lucide-react";
import MainIcon from "../mainicon";
import { Azeret_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import Link from "next/link";

type NavbarProps = {
  defaultPage: boolean;
};

const azeret_mono = Azeret_Mono({ subsets: ["latin"] });

/**
 * Top navigation bar component
 *
 * @remarks
 * This component renders a fixed top navigation bar with different layouts
 * depending on whether it's the default page or a subpage.
 *
 * @param defaultPage - Determines if the navigation bar is for the default page layout
 * @param backLink - URL for the back button navigation
 *
 * @returns Returns a navigation bar with either a notification bell or a back button and logo
 */
export function TopNavBar({ defaultPage }: NavbarProps) {
  const router = useRouter();

  return (
    <nav className={`flex items-center w-full fixed top-0 h-[3.688rem] bg-background border-b border-gray- z-40 justify-start pl-4`}>
      <div className={`h-8.5 flex justify-center items-center z-50`}>
        {defaultPage ? (
          <></>
        ) : (
          <>
            {/*<Link href={backLink} className="flex gap-4"></Link>*/}
            <div className="flex gap-4">
              <button type="button" onClick={() => router.back()} className="cursor-pointer">
                <ChevronLeft size={24} />
              </button>
              <Link href="/dashboard">
                <figure className="flex items-center gap-2">
                  <div className="h-6">
                    <MainIcon className="h-full w-auto" />
                  </div>

                  <p className={`${azeret_mono.className} text-xl`}>StudyDash</p>
                </figure>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
