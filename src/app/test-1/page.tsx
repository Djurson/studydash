"use client";

import { CustomTrigger } from "@/components/navigation/sidebar-trigger";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarProvider } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="min-w-screen min-h-screen bg-green-400 flex">
        <SidebarProvider className="w-fit flex-col bg-white-100">
          <div className="sticky z-50">
            <CustomTrigger />
          </div>
          <Sidebar className="mt-[3.688rem]">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Generellt</SidebarGroupLabel>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
        <div className="flex-1 flex flex-col">
          <div className="w-full bg-white-100 h-12">
            <Bell />
          </div>
          <div className="w-full bg-red-500 h-50"></div>
        </div>
      </div>
    </>
  );
}
