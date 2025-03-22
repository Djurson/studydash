"use client";

import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppSidebarTrigger } from "./sidebar-trigger";

export function ClientSidebar() {
  return (
    <SidebarProvider className="w-fit flex-col bg-white-100">
      <AppSidebarTrigger />
      <AppSidebar />
    </SidebarProvider>
  );
}
