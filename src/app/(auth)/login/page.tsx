import LoginForm from "@/components/Login/LoginForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login | Agencio",
};

export default function LoginPage() {
  return (
    <>
      <section className="py-[20px]">
        <LoginForm />
      </section>
    </>
  );
}
