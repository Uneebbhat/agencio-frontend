"use client";

import { useState } from "react";
import useFormHandler from "../useFormHandler";
import { toast } from "sonner";
import axios from "axios";

interface ResetPasswordProps {
  password: string;
}

const useResetPassword = (token: any) => {
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
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "An error occurred during password reset"
      );
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
