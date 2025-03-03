"use client";

import DashboardLayout from "@/layout/DashboardLayout";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-lg">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
