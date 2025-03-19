"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import useTogglePassword from "@/hooks/useTogglePassword";
import useSignup from "@/hooks/api/useSignup";
import useUserStore from "@/store/useUserStore";

const SignupForm = () => {
  const router = useRouter();
  const { showPassword, handleTogglePassword } = useTogglePassword();
  const { formData, loading, handleOnChange, handleOnSubmit } = useSignup();
  const user = useUserStore((state) => state.getUser());

  useEffect(() => {
    if (user) {
      router.replace("/agency-setup");
    }
  }, [user, router]);

  return (
    <>
      <Card className="relative overflow-hidden">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Enter your credentials to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOnSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="johndoe@example.com"
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
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
                    placeholder="Password"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div>
                <Button
                  className="w-full"
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.email ||
                    !formData.password
                  }
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Signup
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col justify-between">
          <Separator className="mb-4" />
          <div className="w-full relative">
            <Badge
              className="absolute z-20 right-[-5px] top-[-5px]"
              variant="outline"
            >
              Coming soon
            </Badge>
            <Button className="w-full" variant={"outline"} disabled>
              <Image
                src={"/assets/google.png"}
                alt="Google"
                width={20}
                height={20}
              />
              Google
            </Button>
          </div>
          <p className="mt-4">
            Already have an account?{" "}
            <Link href={"/login"} className="underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignupForm;
