"use client";

import { ComponentProps, useState } from "react";
import { Button } from "../ui/button";

type PillButtonProps = ComponentProps<typeof Button> & {
  currentValue: string;
};

export function PillButton({ currentValue, ...props }: PillButtonProps) {
  return (
    <>
      <button
        className={`border-1 px-4 py-1.5 rounded-2xl font-semibold text-sm transition duration-200 ease-in-out
                    cursor-pointer hover:text-blue-900 hover:border-blue-900
                      ${
                        props.value === currentValue
                          ? "text-blue-900 border-blue-900 bg-blue-100"
                          : "text-gray-900 border-gray-100 bg-white"
                      }`}
        {...props}>
        {props.id}
      </button>
    </>
  );
}

export function PillbuttonContainer() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="mt-4 flex gap-4">
      <PillButton
        id={"Alla"}
        value={""}
        currentValue={selected}
        onClick={() => setSelected("Alla")}
      />
      <PillButton
        id={"Ordinare"}
        value={"Ordinare"}
        currentValue={selected}
        onClick={() => setSelected("Ordinare")}
      />
      <PillButton
        id={"Augusti"}
        value={"Augusti"}
        currentValue={selected}
        onClick={() => setSelected("Augusti")}
      />
    </div>
  );
}
