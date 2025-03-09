import SignupForm from "@/components/Signup/SignupForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Signup | Agencio",
};

const page = () => {
  return (
    <>
      <section className="p-[20px]">
        <SignupForm />
      </section>
    </>
  );
};

export default page;
