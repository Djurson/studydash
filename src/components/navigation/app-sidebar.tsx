import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

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
} from "@/components/ui/sidebar";

// Menu items.
const general = [
  {
    title: "Översikt",
    url: "#",
    icon: Home,
  },
  {
    title: "Min utbildning",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Studiemedel",
    url: "#",
    icon: Calendar,
  },
];

const help = [
  {
    title: "Gamla tentor",
    url: "#",
    icon: Home,
  },
  {
    title: "Master builder",
    url: "#",
    icon: Inbox,
  },
];

const others = [
  {
    title: "Inställningar",
    url: "#",
    icon: Home,
  },
  {
    title: "Support",
    url: "#",
    icon: Inbox,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="">
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
        <SidebarFooter>
          <p>This is a footer</p>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
