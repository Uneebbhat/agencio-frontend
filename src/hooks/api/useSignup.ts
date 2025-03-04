"use client";

import { useState } from "react";
import { toast } from "sonner";
import useFormHandler from "@/hooks/useFormHandler";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

interface SignupFormDataProps {
  name: string;
  email: string;
  password: string;
}

const useSignup = () => {
  const router = useRouter();
  const { formData, handleOnChange } = useFormHandler<SignupFormDataProps>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { signup } = useUserStore();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(formData);

      toast.success("Account successfully created");
      signup({
        id: "1",
        name: formData.name,
        email: formData.email,
        password: formData.password,
        token: "token",
      });
      router.push("/launchpad");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, handleOnChange, handleOnSubmit };
};

export default useSignup;
