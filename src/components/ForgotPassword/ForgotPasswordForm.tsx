"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/components/magicui/shine-border";
import useForgotPassword from "@/hooks/api/useForgotPassword";
import Spinner from "@/components/Spinner";
import EmailSentSuccess from "./EmailSentSuccess";
import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { formData, loading, success, handleOnChange, handleOnSubmit } =
    useForgotPassword();
  const user = useUserStore((state) => state.getUser());

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (success) {
    return (
      <>
        <EmailSentSuccess />
      </>
    );
  }

  return (
    <>
      <Card className="relative overflow-hidden">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password. We will send you a link to
            reset it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOnSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <Button
                  className="w-full"
                  disabled={loading || !formData.email}
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Send email
                    </>
                  ) : (
                    "Send email"
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

export default ForgotPasswordForm;
