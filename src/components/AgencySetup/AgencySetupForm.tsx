"use client";

import React from "react";
import { ShineBorder } from "@/components/magicui/shine-border";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateAgency from "@/hooks/api/useCreateAgency";
const AgencySetupForm = () => {
  const {
    formData,
    loading,
    handleOnChange,
    handleFileChange,
    handleOnSubmit,
  } = useCreateAgency();
  return (
    <>
      <Card className="relative overflow-hidden w-[450px] max-w-[100vw] mx-[20px]">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader>
          <CardTitle>Enter Agency details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOnSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="agencyName">Agency Name</Label>
                <Input
                  id="agencyName"
                  name="agencyName"
                  type="text"
                  placeholder="Microsoft"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agencyEmail">Agency Email</Label>
                <Input
                  id="agencyEmail"
                  name="agencyEmail"
                  type="email"
                  placeholder="info@example.com"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agencyWebsite">Agency Website</Label>
                <Input
                  id="agencyWebsite"
                  name="agencyWebsite"
                  type="text"
                  placeholder="www.example.com"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  type="text"
                  placeholder="Software Agency"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agencySize">Agency Size</Label>
                <Input
                  id="agencySize"
                  name="agencySize"
                  type="number"
                  placeholder="500+"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agencyPhone">Agency Phone Number</Label>
                <Input
                  id="agencyPhone"
                  name="agencyPhone"
                  type="number"
                  placeholder="+1 234 567 8901"
                  onChange={handleOnChange}
                  className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agencyLogo">Agency Logo</Label>
                <Input
                  id="agencyLogo"
                  name="agencyLogo"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <Button
                  className="w-full"
                  disabled={
                    loading ||
                    !formData.agencyEmail ||
                    !formData.agencyName ||
                    !formData.agencySize ||
                    !formData.industry ||
                    !formData.agencyPhone
                  }
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Send email
                    </>
                  ) : (
                    "Finish"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AgencySetupForm;
