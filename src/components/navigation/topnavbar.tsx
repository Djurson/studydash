"use client";
import { Bell } from "lucide-react";

export function TopNavBar() {
  return (
    <nav className=" flex items-center justify-end pr-4 w-full fixed top-0 h-[3.688rem] bg-white-400 border-b border-gray- z-40">
      <div className="h-8.5 aspect-square rounded-md bg-white flex justify-center items-center z-50">
        <Bell size={24} />
      </div>
    </nav>
  );
}
