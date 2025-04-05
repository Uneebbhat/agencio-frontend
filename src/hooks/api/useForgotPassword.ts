"use client";

import { useState } from "react";
import useFormHandler from "../useFormHandler";
import { toast } from "sonner";
import axios from "axios";

interface ForgotPasswordProps {
  email: string;
}

const useForgotPassword = () => {
  const { formData, handleOnChange } = useFormHandler<ForgotPasswordProps>({
    email: "",
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/v1/forgot-password", {
        email: formData.email,
      });

      toast.success(data.message);

      setSuccess(true);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "An error occurred");
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

export default useForgotPassword;
