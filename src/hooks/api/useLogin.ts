"use client";

import useFormHandler from "@/hooks/useFormHandler";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

interface LoginFormDataProps {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();
  const { formData, handleOnChange } = useFormHandler<LoginFormDataProps>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useUserStore();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(formData);
      toast.success("Login successfully");
      router.push("/dashboard");
      login({
        id: "12",
        name: "Uneeb",
        email: formData.email,
        password: formData.password,
        token: "123",
      });
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleOnChange, handleOnSubmit, loading };
};

export default useLogin;
