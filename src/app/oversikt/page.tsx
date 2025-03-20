"use client"

import { useAuth } from "@/components/firebase/authcontext";
import { UserInputDB } from "@/components/firebase/usertypes";
import PillButton from "@/components/main/pillbutton";
import { useEffect, useState } from "react";
import { adminAuth } from "../../../firebase/server";
import { useRouter } from "next/navigation";

export default function Page() {
    const auth = useAuth();
    const router = useRouter();
    const [current, setCurrent] = useState("");

    function SignOut() {
        auth?.Logout();
        router.push("/");
    }

    // Testning bara ta bort senare
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

        localStorage.removeItem("signUpInfo");
    }, [])

    console.log(auth?.userInfo)
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