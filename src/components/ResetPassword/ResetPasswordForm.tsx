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
import { Eye, EyeClosed } from "lucide-react";
import useTogglePassword from "@/hooks/useTogglePassword";
import useResetPassword from "@/hooks/api/useResetPassword";
import Spinner from "@/components/Spinner";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import { useParams, useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";

const ResetPasswordForm = () => {
  const router = useRouter();
  const token = useParams();
  const { showPassword, handleTogglePassword } = useTogglePassword();
  const { formData, loading, success, handleOnChange, handleOnSubmit } =
    useResetPassword(token);

  if (success) {
    return (
      <section className="p-[20px]">
        <ResetPasswordSuccess />
      </section>
    );
  }

  const user = useUserStore((state) => state.getUser());

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <>
      <Card className="relative overflow-hidden w-full">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOnSubmit}>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">New Password</Label>
                <div className="relative cursor-pointer">
                  <div onClick={handleTogglePassword}>
                    {showPassword ? (
                      <Eye className="absolute right-2 top-2" size={20} />
                    ) : (
                      <EyeClosed className="absolute right-2 top-2" size={20} />
                    )}
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={handleOnChange}
                    placeholder="Password"
                  />
                </div>
              </div>
              <div>
                <Button
                  className="w-full"
                  disabled={loading || !formData.password}
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Update password
                    </>
                  ) : (
                    "Update password"
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

export default ResetPasswordForm;
