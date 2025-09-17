import { Metadata } from "next";
import { SignupForm } from "@/modules/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Signup | Agencioo",
  description: "Signup to Agencioo",
};

export default function SignupPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
