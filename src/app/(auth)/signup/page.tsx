import SignupForm from "@/components/Signup/SignupForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Signup | Agencio",
};

export default function SignupPage() {
  return (
    <>
      <section className="py-[20px]">
        <SignupForm />
      </section>
    </>
  );
}
