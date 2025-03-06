"use client";

import useFormHandler from "@/hooks/useFormHandler";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import axios from "axios";

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
      const res = await axios.post("/api/v1/login", {
        email: formData.email,
        password: formData.password,
      });
      toast.success(res.data.message);
      login({
        id: res.data.data._id,
        name: res.data.data.name,
        email: res.data.data.email,
        token: res.data.token,
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleOnChange, handleOnSubmit, loading };
};

export default useLogin;
