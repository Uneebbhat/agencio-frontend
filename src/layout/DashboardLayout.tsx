"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Development Banner */}
        <div className="w-full bg-gradient-to-r text-center py-2 px-4 font-semibold flex items-center justify-center gap-2 rounded-b-lg shadow-sm mb-4">
          <span className="text-xl">🚧</span>
          <span>
            This website is{" "}
            <span className="underline underline-offset-2">
              still under development
            </span>{" "}
            — features may change!
          </span>
          <span className="text-xl">🛠️</span>
        </div>
        {/* End Development Banner */}
        <header className="flex flex-col h-16 shrink-0  gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-2">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                  const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                  const formattedSegment =
                    segment.charAt(0).toUpperCase() +
                    segment.slice(1).replace(/-/g, " ");

                  return (
                    <div key={href} className="flex items-center">
                      <BreadcrumbItem>
                        /
                        {index === pathSegments.length - 1 ? (
                          <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>
                            {formattedSegment}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
