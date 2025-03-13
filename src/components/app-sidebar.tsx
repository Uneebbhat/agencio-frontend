"use client";

import * as React from "react";
import {
  Archive,
  AudioWaveform,
  ClipboardList,
  Command,
  Folder,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  SquareKanban,
  Target,
  Users,
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
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
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
    { title: "Goals", url: "/goals", icon: Target },
    { title: "Bucket", url: "/bucket", icon: Archive },
    { title: "Launchpad", url: "/launchpad", icon: ClipboardList },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
