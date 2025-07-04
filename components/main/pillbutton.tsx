"use client";

import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { CourseJSON } from "@/utils/types";

type PillButtonProps = ComponentProps<typeof Button> & {
  currentValue: string;
};

/**
 * Pill button component
 *
 * @remarks
 * This component renders a button that changes its appearance based on the current value.
 * It highlights the selected button with a different style.
 *
 * @param currentValue - The currently selected value used to determine the active button
 * @param props - Additional button props such as `value` and `id` passed down from the parent component
 *
 * @returns Returns a styled pill button with a hover effect and active state
 */

export function PillButton({ currentValue, ...props }: PillButtonProps) {
  return (
    <>
      <button
        className={`border-1 px-4 py-1.5 rounded-2xl font-semibold text-sm transition duration-200 ease-in-out
                    cursor-pointer hover:text-blue-900 hover:border-blue-900
                      ${props.value === currentValue ? "text-blue-900 border-blue-900 bg-highlight dark:text-foreground" : "text-foreground dark:border-muted bg-accent"}`}
        {...props}>
        {props.id}
      </button>
    </>
  );
}

export function PillbuttonContainer({ mainSubjects, selected, setSelected }: { mainSubjects: Map<string, CourseJSON[]>; selected: string; setSelected: (filter: string) => void }) {
  //För återanvändning pillbutton skriv id och titel här sen hämtar du dessa vid din component t.ex  id: "Alla", value: "Alla"
  return (
    <div className="my-4 flex gap-4">
      <PillButton id={"Alla"} value={"Alla"} currentValue={selected} onClick={() => setSelected("Alla")} />
      <PillButton id={"Oavklarade"} value={"Oavklarade"} currentValue={selected} onClick={() => setSelected("Oavklarade")} />
      <PillButton id={"Avklarade"} value={"Avklarade"} currentValue={selected} onClick={() => setSelected("Avklarade")} />
      {Array.from(mainSubjects.keys()).map((subject: string) => (
        <PillButton key={subject} id={subject} value={subject} currentValue={selected} onClick={() => setSelected(subject)} />
      ))}
    </div>
  );
}
