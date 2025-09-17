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
      title: "Goals",
      url: "/goals",
      icon: Target,
    },
    { title: "Team", url: "/team", icon: Users },
    {
      title: "AI Chat",
      url: "/ai-chat",
      icon: MessageCircle,
      // badge: "Coming Soon",
      // disabled: true,
    },

    { title: "Launchpad", url: "/launchpad", icon: ClipboardList },
    {
      title: "Bucket",
      url: "/bucket",
      icon: Archive,
      badge: "Coming Soon",
      disabled: true,
    },
    {
      title: "Pipelines",
      url: "/pipelines",
      icon: SquareKanban,
      badge: "Coming Soon",
      disabled: true,
      // items: [
      //   { title: "MicroSoft", url: "/pipelines/board/microsoft", icon: Frame },
      //   { title: "Google", url: "/pipelines/board/google", icon: Frame },
      //   { title: "Facebook", url: "/pipelines/board/facebook", icon: Frame },
      // ],
    },
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
