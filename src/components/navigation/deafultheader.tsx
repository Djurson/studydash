import { Menu } from "lucide-react";
import { Bell } from "lucide-react";
import MainIcon from "../mainicon";
import { Azeret_Mono } from "next/font/google";
import { useSidebar } from "@/components/ui/sidebar";
import { CustomTrigger } from "@/components/navigation/sidebar-trigger";

const azeret_mono = Azeret_Mono({ subsets: ["latin"] });

export default function DefaultHeader() {
  return (
    <>
      <header className="fixed top-0 left-0 flex w-full items-center px-4 py-3 bg-white-400 border-b border-gray-200 ">
        <nav className="flex w-full items-center gap-6">
          <CustomTrigger />

          <figure className="flex items-center gap-2">
            <div className="h-6">
              <MainIcon className="h-full w-auto" />
            </div>
            <p className={`${azeret_mono.className} text-xl`}>Portalen</p>
          </figure>
        </nav>
        <div className="h-8.5 aspect-square rounded-md bg-white flex justify-center items-center">
          <Bell size={24} />
        </div>
      </header>
    </>
  );
}
