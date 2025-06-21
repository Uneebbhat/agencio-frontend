"use client";

import { useState } from "react";
import useFormHandler from "../useFormHandler";
import { toast } from "sonner";
import axios from "axios";

interface ResetPasswordProps {
  password: string;
  [key: string]: unknown;
}

interface ResetPasswordToken {
  token: string;
}

const useResetPassword = (token: ResetPasswordToken) => {
  const { formData, handleOnChange } = useFormHandler<ResetPasswordProps>({
    password: "",
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const resetTokenString = JSON.stringify(token.token);
  const resetToken = JSON.parse(resetTokenString);
  // console.log(resetToken);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `/api/v1/reset-password/${resetToken}`,
        {
          password: formData.password,
        }
      );

      toast.success(data.message);

      setSuccess(true);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { error?: string } } };
        toast.error(
          err.response?.data?.error || "An error occurred during password reset"
        );
      } else {
        toast.error("An error occurred during password reset");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    success,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useResetPassword;
