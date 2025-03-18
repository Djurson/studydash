"use client"

import { useAuth } from "@/components/firebase/authcontext";
import PillButton from "@/components/main/pillbutton";
import { useState } from "react";

export default function Page() {
    const auth = useAuth();
    const [current, setCurrent] = useState("");

    function SignOut() {
        auth?.Logout();
    }

    console.log(auth?.user)
    return (
        <>
            <div className="w-full h-dvh">
                <PillButton label="Alla" id="alla" onChange={() => setCurrent("alla")} currentValue={current} value="alla" />
                <p className="text-gray-900">{auth?.user?.email}</p>
                <button className="text-gray-900" onClick={SignOut}>Logga ut</button>
            </div>
        </>
    )
}