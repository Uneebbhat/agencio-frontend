import DashboardLayout from "@/layout/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients | Agencio",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
