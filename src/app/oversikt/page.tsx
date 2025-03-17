"use client"

import { useAuth } from "@/components/firebase/authcontext";
import { auth } from "../../../firebase/client";
import PillButton from "@/components/main/pillbutton";
import { signOut } from "firebase/auth";
import { useState } from "react";

export default function Page() {
    const { user } = useAuth();
    const [current, setCurrent] = useState("");

    function SignOut() {
        signOut(auth);
    }

    console.log(user)
    return (
        <>
            <div className="w-full h-dvh">
                <PillButton label="Alla" id="alla" onChange={() => setCurrent("alla")} currentValue={current} value="alla" />
                <p className="text-gray-900">{user?.email}</p>
                <button className="text-gray-900" onClick={SignOut}>Logga ut</button>
            </div>
        </>
    )
}