"use client";
import { Bell, ChevronLeft } from "lucide-react";
import MainIcon from "../mainicon";
import { Azeret_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeSwitcher } from "../supabase-template/theme-switcher";

type NavbarProps = {
  defaultPage: boolean;
};

const azeret_mono = Azeret_Mono({ subsets: ["latin"] });
export function TopNavBar({ defaultPage }: NavbarProps) {
  return (
    <nav
      className={`flex items-center w-full fixed top-0 h-[3.688rem] bg-white-400 border-b border-gray- z-40
      ${defaultPage ? "justify-end pr-4" : "justify-start pl-4"}`}>
      <div
        className={`h-8.5 flex justify-center items-center z-50
        ${defaultPage ? "aspect-square rounded-md bg-white" : ""} `}>
        {defaultPage ? (
          <>
            <ThemeSwitcher />
            <Bell size={24} />
          </>
        ) : (
          <>
            <Link href={"/dashboard"} className="flex gap-4">
              <ChevronLeft size={24} />
              <figure className="flex items-center gap-2">
                <div className="h-6">
                  <MainIcon className="h-full w-auto" />
                </div>
                <p className={`${azeret_mono.className} text-xl`}>Portalen</p>
              </figure>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
