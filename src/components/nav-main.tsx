"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
    badge?: string;
    disabled?: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                {item.items && item.items.length > 0 ? (
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="flex items-center justify-between"
                    disabled={item.disabled}
                  >
                    <Link
                      href={item.url}
                      className={`flex items-center justify-between w-full ${
                        item.disabled ? "pointer-events-none opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon size={20} />}
                        <span>{item.title}</span>
                      </div>
                      {item.badge && <Badge>{item.badge}</Badge>}
                    </Link>
                    <div>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        size={14}
                      />
                    </div>
                  </SidebarMenuButton>
                ) : (
                  <Link
                    href={item.url}
                    className={`w-full ${
                      item.disabled ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    <SidebarMenuButton
                      tooltip={item.title}
                      disabled={item.disabled}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon size={20} />}
                        <span>{item.title}</span>
                      </div>
                      {item.badge && <Badge>{item.badge}</Badge>}
                    </SidebarMenuButton>
                  </Link>
                )}
              </CollapsibleTrigger>

              {item.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
