"use client";

import { WithAuthProps } from "@/utils/types";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppSidebarTrigger } from "./sidebar-trigger";

/**
 * Client sidebar component
 *
 * @remarks
 * This component provides a sidebar with a trigger button, wrapped inside a SidebarProvider.
 * It ensures that the sidebar functionality is properly managed within the provider.
 *
 * @returns Returns a sidebar layout with a toggle button and sidebar navigation
 */
export function ClientSidebar({ user }: WithAuthProps) {
  return (
    <SidebarProvider className="w-fit flex-col bg-white-100">
      <AppSidebarTrigger />
      <AppSidebar user={user} />
    </SidebarProvider>
  );
}
