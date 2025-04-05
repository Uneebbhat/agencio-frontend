"use client";

import * as React from "react";
import {
  Archive,
  ClipboardList,
  Folder,
  Frame,
  LayoutDashboard,
  SquareKanban,
  Target,
  Users,
  MessageCircle,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    { title: "Clients", url: "/clients", icon: Users },
    {
      title: "Projects",
      url: "/projects",
      icon: Folder,
      items: [
        { title: "MicroSoft", url: "/projects/microsoft", icon: Frame },
        { title: "Google", url: "/projects/google", icon: Frame },
        { title: "Facebook", url: "/projects/facebook", icon: Frame },
      ],
    },
    {
      title: "Pipelines",
      url: "/pipelines",
      icon: SquareKanban,
      items: [
        { title: "MicroSoft", url: "/projects/microsoft", icon: Frame },
        { title: "Google", url: "/projects/google", icon: Frame },
        { title: "Facebook", url: "/projects/facebook", icon: Frame },
      ],
    },
    { title: "Team", url: "/team", icon: Users },
    {
      title: "Goals",
      url: "/goals",
      icon: Target,
      badge: "Coming Soon",
      disabled: true,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageCircle,
      badge: "Coming Soon",
      disabled: true,
    },
    {
      title: "Bucket",
      url: "/bucket",
      icon: Archive,
      badge: "Coming Soon",
      disabled: true,
    },
    { title: "Launchpad", url: "/launchpad", icon: ClipboardList },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
