"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, LayoutDashboard, Settings, Users } from "lucide-react";
import CreateAgencyModal from "@/components/Launchpad/CreateAgencyModal";

const Page = () => {
  const [hasAgency, setHasAgency] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateAgency = () => {
    setHasAgency(true);
    setIsModalOpen(false);
  };

  return (
    <section className="p-6 flex items-center justify-center h-[80dvh]">
      <Card className="w-[500px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">🚀 Launchpad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2">
                <Users size={18} className="text-blue-500" /> Create your agency
              </p>
              <Button
                className="w-[200px]"
                disabled={hasAgency}
                variant={hasAgency ? "outline" : "default"}
                onClick={() => setIsModalOpen(true)}
              >
                {hasAgency ? (
                  <>
                    <CheckCircle size={18} className="text-green-500" />
                    Agency Created
                  </>
                ) : (
                  "Create Agency"
                )}
              </Button>
            </div>

            {hasAgency && (
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2">
                  <Settings size={18} className="text-gray-500" /> Manage Agency
                  Settings
                </p>
                <Button className="w-[200px]">Settings</Button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2">
                <LayoutDashboard size={18} className="text-yellow-500" /> View
                Dashboard
              </p>
              <Button variant="default" className="w-[200px]">
                View Dashboard
              </Button>
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

      {/* Modal for Creating Agency */}
      <CreateAgencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleCreateAgency={handleCreateAgency}
      />
    </section>
  );
};

export default Page;
