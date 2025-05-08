"use client";
import { useState } from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import { StatusSquare } from "../edit/statussquare";

interface EditMasterSemesterProps {
  semester: {
    fullString: string;
    semester: "HT" | "VT";
    year: number;
  };
  index: number;
}

export default function MasterSemester({ semester, index }: EditMasterSemesterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <main className=" bg-accent overflow-hidden rounded-2xl shadow-[2px_4px_12px_0px_rgba(0,_0,_0,_0.08)] w-full h-full">
        <button className="flex items-center justify-between w-full p-4 cursor-pointer hover:bg-highlight-2" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex gap-4 items-center">
            <StatusSquare status={"none"} />
            <h3 className="text-lg font-medium">Termin {index + 1}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-29">
              <p className=" text-sm text-gray-600 w-22 text-center ">{semester.fullString.slice(-7)}</p>
              <div className="w-17.5 h-1"></div>
              <p className=" text-sm text-gray-600 w-13 text-right "></p>
            </div>

            <ChevronDown size={24} className={`col-start-8 justify-self-end transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
          </div>
        </button>
        <section>
          {isOpen && (
            <div className="p-4">
              <div className=" flex items-center pl-4  gap-2">
                <CircleAlert size={18} color="#f36961" />
                <p className="text-sm">Inga tillagda masterkurser</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
