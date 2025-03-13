"use client";

import { useState } from "react";
import useFormHandler from "../useFormHandler";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ForgotPasswordProps {
  email: string;
}

const useForgotPassword = () => {
  const { formData, handleOnChange } = useFormHandler<ForgotPasswordProps>({
    email: "",
  });
  const [success, setSuccess] = useState<boolean>(false);

  const mutation = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: async () => {
      const { data } = await axios.post("/api/v1/forgot-password", {
        email: formData.email,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setSuccess(true);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "An error occurred");
      setSuccess(false);
    },
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return {
    formData,
    loading: mutation.isPending,
    success,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useForgotPassword;
