import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agencio | All-in-One Agency Management Platform",
  description:
    "Agencio is a multi-tenant SaaS platform for digital agencies, freelancers, and in-house teams. Manage clients, projects, tasks, and files in one unified workspace powered by AI insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
