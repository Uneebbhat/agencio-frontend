"use client";

import useFormHandler from "@/hooks/useFormHandler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
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
  const { login } = useUserStore();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      const { data } = await axios.post("/api/v1/login", {
        email: formData.email,
        password: formData.password,
      });
      return data;
    },
    onSuccess: (data: any) => {
      console.log(data);

      toast.success(data.message);
      login({
        id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        profilePic: data.data.profilePic,
        token: data.token,
      });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to login");
    },
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return {
    formData,
    loading: mutation.isPending,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useLogin;
