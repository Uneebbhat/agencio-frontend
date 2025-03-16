"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, LayoutDashboard, Settings, Users } from "lucide-react";
import useCompanyStore from "@/store/useAgencyStore";
import Link from "next/link";

const LaunchpadData = () => {
  const getAgency = useCompanyStore((state) => state.getAgency());
  return (
    <>
      <Card className="w-[500px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">🚀 Launchpad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2">
                <Users size={18} className="text-blue-500" /> Create your Agency
              </p>
              <Button
                className="w-[200px]"
                disabled={getAgency as any}
                variant={getAgency ? "outline" : "default"}
              >
                {getAgency ? (
                  <>
                    <CheckCircle size={18} className="text-green-500" />
                    Agency Created
                  </>
                ) : (
                  "Create Agency"
                )}
              </Button>
            </div>

            {getAgency && (
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2">
                  <Settings size={18} className="text-gray-500" /> Manage Agency
                  Settings
                </p>
                <Link href={"/company/settings"}>
                  <Button className="w-[200px]">Settings</Button>
                </Link>
              </div>
            )}

            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2">
                <LayoutDashboard size={18} className="text-yellow-500" /> View
                Dashboard
              </p>
              <Link href={"/dashboard"}>
                <Button variant="default" className="w-[200px]">
                  View Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" /> See your
                subscription plan
              </p>
              <Button className="w-[200px]">See Plan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LaunchpadData;
