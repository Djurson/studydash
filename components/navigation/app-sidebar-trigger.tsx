"use client";
import { useSidebar } from "../ui/sidebar";
import { Menu } from "lucide-react";
import { Azeret_Mono } from "next/font/google";
import MainIcon from "../mainicon";
const azeret_mono = Azeret_Mono({ subsets: ["latin"] });

/**
 * Sidebar trigger component
 * 
 * @remarks
 * This component provides a button to toggle the sidebar visibility
 * and displays the main application icon with a title.
 * 
 * @returns Returns a fixed top navigation element with a sidebar toggle button
 */
export function AppSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center gap-6 z-50 h-[3.688rem] px-4 fixed top-0 left-0 border-b border-gray-200">
      <button onClick={toggleSidebar} className="cursor-pointer">
        <Menu size={24} />
      </button>

      <figure className="flex items-center gap-2">
        <div className="h-6">
          <MainIcon className="h-full w-auto" />
        </div>
        <p className={`${azeret_mono.className} text-xl`}>Portalen</p>
      </figure>
    </div >
  );
}
