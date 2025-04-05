import AuthLayout from "@/layout/AuthLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency Setup | Agencio",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
