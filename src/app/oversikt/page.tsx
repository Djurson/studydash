"use client"

import PillButton from "@/components/main/pillbutton";
import { useState } from "react";

export default function Page() {
    const [current, setCurrent] = useState("");
    return (
        <>
            <div className="w-full h-dvh">
                <PillButton label="Alla" id="alla" onChange={() => setCurrent("alla")} currentValue={current} value="alla" />
            </div>
        </>
    )
}