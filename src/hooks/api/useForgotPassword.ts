"use client";

import { useState } from "react";
import useFormHandler from "../useFormHandler";
import { toast } from "sonner";

interface ForgotPasswordProps {
  email: string;
}

const useForgotPassword = () => {
  const { formData, handleOnChange } = useFormHandler<ForgotPasswordProps>({
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(formData);
      toast.success("Password reset email sent");
      setSuccess(true);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, success, handleOnChange, handleOnSubmit };
};

export default useForgotPassword;
