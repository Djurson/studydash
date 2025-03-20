"use client";

import { useAuth } from "@/components/firebase/authcontext";
import DefaultHeader from "@/components/navigation/deafultheader";
import PillButton from "@/components/main/pillbutton";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";

import { useEffect, useState } from "react";
import { UserInputDB } from "@/components/firebase/usertypes";

export default function Page() {
  const auth = useAuth();
  const [current, setCurrent] = useState("");

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

  function SignOut() {
    auth?.Logout();
  }

  console.log(auth?.user);
  return (
    <>
      <SidebarProvider className="flex flex-col gap-3">
        <div className="z-50">
          <DefaultHeader />
        </div>

        <div className="flex mt-[2.938rem] h-full">
          <AppSidebar />

          <main>
            <div className="flex items-center justify-center p-10 w-full">
              <PillButton
                label="Alla"
                id="alla"
                onChange={() => setCurrent("alla")}
                currentValue={current}
                value="alla"
              />
              <p className="text-gray-900">{auth?.user?.email}</p>
              <button className="text-gray-900" onClick={SignOut}>
                Logga ut
              </button>
            </div>
            <div className="h-[788px] bg-amber-500"></div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
