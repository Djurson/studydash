"use client";

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
} from "@/components/ui/sidebar";

import { NavUser } from "@/components/navigation/nav-user";

// Menu items.
const general = [
  {
    title: "Översikt",
    url: "#",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Min utbildning",
    url: "#",
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
    url: "#",
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
