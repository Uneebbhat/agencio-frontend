"use client";

import useFormHandler from "@/hooks/useFormHandler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import axios from "axios";
import { useState } from "react";

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
  const { login } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/v1/login", {
        email: formData.email,
        password: formData.password,
      });

      login({
        id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        profilePic: data.data.profilePic,
        token: data.token,
      });

      toast.success(data.message);

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useLogin;
