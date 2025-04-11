"use client";

import { ComponentProps, useState } from "react";
import { Button } from "../ui/button";
import { PillButton } from "./pillbutton";

type PillButtonProps = ComponentProps<typeof Button> & {
  currentValue: string;
};



export function PillButton_prest() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="mt-4 flex gap-4">
      <PillButton
        id={"Mina"}
        value={""}
        currentValue={selected}
        onClick={() => setSelected("Mina")}
      />
      <PillButton
        id={"Alla"}
        value={"Alla"}
        currentValue={selected}
        onClick={() => setSelected("Alla")}
      />
    
    </div>
  );
}
