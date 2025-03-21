"use client";
import DefaultHeader from "@/components/navigation/deafultheader";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";

export default function Page() {
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
