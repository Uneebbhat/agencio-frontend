"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/Spinner";
import { Eye, EyeClosed } from "lucide-react";
import useTogglePassword from "@/hooks/useTogglePassword";
import { ShineBorder } from "@/components/magicui/shine-border";
import useLogin from "@/hooks/api/useLogin";
import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { showPassword, handleTogglePassword } = useTogglePassword();
  const { formData, loading, handleOnChange, handleOnSubmit } = useLogin();
  const user = useUserStore((state) => state.getUser());

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <>
      <Card className="relative overflow-hidden">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
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
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-[12px] underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
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
                  disabled={loading || !formData.email || !formData.password}
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Login
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col justify-between">
          <Separator className="my-4" />
          <div className="w-full relative">
            <Badge
              className="absolute z-20 right-[-5px] top-[-5px] bg-white"
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
            Need an account?{" "}
            <Link href={"/signup"} className="underline">
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginForm;
