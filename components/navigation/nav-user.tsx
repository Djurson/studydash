"use client";

import { UserRound, Settings, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { SignOutAction } from "@/app/actions";
import { WithAuthProps } from "@/utils/types";
import Link from "next/link";

/**
 * Navigation user dropdown component
 *
 * @remarks
 * This component provides a user profile dropdown inside the sidebar menu.
 * It displays the user's avatar, name, and email, along with navigation options.
 *
 * @param user - Object containing user information (name, email, and avatar URL)
 *
 * @returns Returns a dropdown menu for user account options, including account settings and logout
 */
export function NavUser({ user }: WithAuthProps) {
  const { isMobile } = useSidebar();
  let fallback = "";

  if (!user) return null;

  if (user) {
    const name = user.user_metadata?.name;
    const nameSplit = name?.split(" ");

    if (nameSplit.length < 1) return;
    fallback = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
  }

  return (
    <main className="cursor-pointer">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.name} />
                  <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.user_metadata?.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata?.name} />
                    <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.user_metadata.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href="/dashboard/profile" className="flex gap-2 items-center w-full">
                    <UserRound />
                    Mitt konto
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="flex gap-2 items-center w-full">
                    <Settings />
                    Inställningar
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={SignOutAction} className="cursor-pointer hover:text-red-900">
                <LogOut />
                <span className="text-red-900">Logga ut</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </main>
  );
}
