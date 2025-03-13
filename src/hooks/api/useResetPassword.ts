"use client";

import { useState } from "react";
import useFormHandler from "../useFormHandler";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ResetPasswordProps {
  password: string;
}

const useResetPassword = (token: any) => {
  const { formData, handleOnChange } = useFormHandler<ResetPasswordProps>({
    password: "",
  });
  const [success, setSuccess] = useState<boolean>(false);

  const resetTokenString = JSON.stringify(token.token);
  const resetToken = JSON.parse(resetTokenString);
  // console.log(resetToken);

  const mutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `/api/v1/reset-password/${resetToken}`,
        {
          password: formData.password,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setSuccess(true);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error || "An error occurred during password reset"
      );
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

export default useResetPassword;
