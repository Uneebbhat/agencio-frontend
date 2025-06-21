"use client";

import React, { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";

const ResetPasswordSuccess = () => {
  const confettiRef = useRef<ConfettiRef>(null);
  return (
    <>
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-[20px] z-0 size-full"
        // onMouseEnter={() => {
        //   confettiRef.current?.fire({});
        // }}
      />
      <Card className="text-center max-w-md mx-auto relative z-40">
        <CardHeader className="flex flex-col items-center space-y-4">
          <div className="bg-green-100 p-3 rounded-full">
            <KeyRound size={48} className="text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Password Reset Successful! 🔐
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-base leading-relaxed">
            Your password has been successfully reset. Here&apos;s what you can
            do now:
          </CardDescription>
          <div className="flex flex-col items-start space-y-3 text-left">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Your new password is now active</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>You can now log in with your new password</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Keep your password secure and don&apos;t share it</span>
            </div>
          </div>
          <div className="pt-4">
            <Link href="/login">
              <Button className="w-full">Login to Your Account</Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Need help? Contact our support team for assistance.
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPasswordSuccess;
