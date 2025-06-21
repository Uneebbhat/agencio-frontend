"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useAgencyStore from "@/store/useAgencyStore";
import Image from "next/image";

export function TeamSwitcher() {
  const getAgencyData = useAgencyStore((state) => state.getAgency());
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div
            className={`flex items-center justify-center rounded-lg text-sidebar-primary-foreground transition-all ${
              open ? "size-10" : "size-8"
            }`}
          >
            <Image
              src={
                typeof getAgencyData?.agencyLogo === "string" &&
                getAgencyData.agencyLogo
                  ? getAgencyData.agencyLogo
                  : open
                  ? "/assets/logo-black.png"
                  : "/assets/logo-black-icon.png"
              }
              alt={getAgencyData?.agencyName || "Agencio"}
              width={100}
              height={100}
            />
          </div>
          {open && getAgencyData?.agencyName && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {getAgencyData.agencyName}
              </span>
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
