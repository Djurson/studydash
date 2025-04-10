"use client";
import { SettingsDialog } from "./settings-dialog";
import {
  ChartNoAxesCombined,
  GraduationCap,
  HandCoins,
  BookOpen,
  Hammer,
  MessageCircleQuestion,
  Settings,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "../ui/sidebar";

import { NavUser } from "./nav-user";

// Menu items.
const general = [
  {
    title: "Översikt",
    url: "/dashboard",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Min utbildning",
    url: "/program",
    icon: GraduationCap,
  },
  {
    title: "Studiemedel",
    url: "#",
    icon: HandCoins,
  },
];

const help = [
  {
    title: "Gamla tentor",
    url: "#",
    icon: BookOpen,
  },
  {
    title: "Master builder",
    url: "#",
    icon: Hammer,
  },
];

const others = [
  {
    title: "Inställningar",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Support",
    url: "#",
    icon: MessageCircleQuestion,
  },
];

const data = {
  user: {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "",
  },
};

/**
 * Application sidebar component
 * 
 * @remarks
 * This component renders a collapsible sidebar containing categorized menu items,
 * user information, and navigation links.
 * 
 * @returns Returns a sidebar navigation element with categorized links and user details
 */
export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="mt-[3.688rem]">
        <SidebarGroup>
          <SidebarGroupLabel>Generellt</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {general.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Hjälpmedel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {help.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Övrigt</SidebarGroupLabel>
           <SidebarGroupContent>
            <SidebarMenu>
             {others.map((item) => (
            <SidebarMenuItem key={item.title}>
            {item.title === "Inställningar" ? (
            <SettingsDialog>
           <SidebarMenuButton>
          <item.icon />
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SettingsDialog>
    ) : (
      <SidebarMenuButton asChild>
        <a href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    )}
  </SidebarMenuItem>
))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
