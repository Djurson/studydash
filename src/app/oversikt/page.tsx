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
import { Content } from "next/font/google";
import { useRouter } from "next/navigation";

export default function Page() {
  const auth = useAuth();
  const router = useRouter();
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (!auth) {
      return;
    }

    if (!auth.user) {
      return;
    }

    const savedUserInfo = localStorage.getItem("signUpInfo");

    if (savedUserInfo) {
      const userInfo = JSON.parse(savedUserInfo);
      const UserInputDB: UserInputDB = {
        year: userInfo.year,
        previous: JSON.parse(userInfo.previous),
      };

      auth.CreateUserData(auth.user, UserInputDB);
    }

    localStorage.removeItem("signUpInfo");
  }, []);

  function SignOut() {
    auth?.Logout();
    router.push("/");
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

          <main className="flex p-4 w-full justify-center">
            <div className=" max-w-[74rem] w-full bg-amber-500 h-[788px]">
              <header className="w-full p-10 bg-amber-200"></header>
              <section></section>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
