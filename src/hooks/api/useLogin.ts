"use client";

import useFormHandler from "@/hooks/useFormHandler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";

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
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              message: "Mock login successful!",
              data: {
                _id: "613618986e68180000000000",
                name: "Uneeb Bhatti",
                email: formData.email,
              },
              token: "mocked_token_abc123",
            },
          });
        }, 1000);
      });
    },
    onSuccess: (data: any) => {
      console.log(data);

      toast.success(data.data.message);
      login({
        id: data.data.data._id,
        name: data.data.data.name,
        email: data.data.data.email,
        token: data.token,
      });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Mock login failed");
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
