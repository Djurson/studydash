"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { AppSidebarTrigger } from "@/components/navigation/sidebar-trigger";

export function ClientSidebar() {
  return (
    <SidebarProvider className="w-fit flex-col bg-white-100">
      <AppSidebarTrigger />
      <AppSidebar />
    </SidebarProvider>
  );
}
