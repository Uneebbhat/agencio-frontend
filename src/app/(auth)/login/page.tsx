import LoginForm from "@/components/Login/LoginForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login | Agencio",
};

const page = () => {
  return (
    <>
      <section className="p-[20px]">
        <LoginForm />
      </section>
    </>
  );
};

export default page;
