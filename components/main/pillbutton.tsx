"use client";

import { ComponentProps, useState } from "react";
import { Button } from "../ui/button";

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

export function PillbuttonContainer() {
  const [selected, setSelected] = useState<string>("Alla");

  return (
    <div className="mt-4 flex gap-4">
      <PillButton id={"Alla"} value={"Alla"} currentValue={selected} onClick={() => setSelected("Alla")} />
      <PillButton id={"Ordinare"} value={"Ordinare"} currentValue={selected} onClick={() => setSelected("Ordinare")} />
      <PillButton id={"Augusti"} value={"Augusti"} currentValue={selected} onClick={() => setSelected("Augusti")} />
      <PillButton id={"Oktober"} value={"Oktober"} currentValue={selected} onClick={() => setSelected("Oktober")} />
      <PillButton id={"Januari"} value={"Januari"} currentValue={selected} onClick={() => setSelected("Januari")} />
      <PillButton id={"Mars"} value={"Mars"} currentValue={selected} onClick={() => setSelected("Mars")} />
      <PillButton id={"Juni"} value={"Juni"} currentValue={selected} onClick={() => setSelected("Juni")} />
    </div>
  );
}
