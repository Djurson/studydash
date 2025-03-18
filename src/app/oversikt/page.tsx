"use client"

import { useAuth } from "@/components/firebase/authcontext";
import { UserInputDB } from "@/components/firebase/usertypes";
import PillButton from "@/components/main/pillbutton";
import { useEffect, useState } from "react";

export default function Page() {
    const auth = useAuth();
    const [current, setCurrent] = useState("");

    function SignOut() {
        auth?.Logout();
    }

    useEffect(() => {
        if (!auth) {
            return
        }

        if (!auth.user) {
            return
        }

        const savedUserInfo = localStorage.getItem("signUpInfo");

        if (savedUserInfo) {
            const userInfo = JSON.parse(savedUserInfo);
            const UserInputDB: UserInputDB = {
                year: userInfo.year,
                previous: JSON.parse(userInfo.previous),
            }

            auth.CreateUserData(auth.user, UserInputDB);
        }
    }, [])

    console.log(auth?.userInfo)
    if (auth?.user) {
        console.log((auth?.user?.emailVerified).toString())
    }

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