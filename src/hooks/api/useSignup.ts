"use client";

import { useState } from "react";
import { toast } from "sonner";
import useFormHandler from "@/hooks/useFormHandler";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface SignupFormDataProps {
  name: string;
  email: string;
  password: string;
  profilePic: File | any;
}

const useSignup = () => {
  const router = useRouter();
  const { formData, handleOnChange, setFormData } =
    useFormHandler<SignupFormDataProps>({
      name: "",
      email: "",
      password: "",
      profilePic: null,
    });
  const { signup } = useUserStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      // Check file type
      if (!file.type.match("image.*")) {
        console.error("Please upload an image file");
        return;
      }

      // Check file size (e.g., limit to 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        console.error("File is too large. Maximum size is 5MB");
        return;
      }

      // Update form data with the file
      setFormData((prevData) => ({
        ...prevData,
        profilePic: file,
      }));
    } else {
      // Handle case when no file is selected
      setFormData((prevData) => ({
        ...prevData,
        profilePic: null,
      }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async () => {
      const userFormData = new FormData();
      userFormData.append("name", formData.name);
      userFormData.append("email", formData.email);
      userFormData.append("password", formData.password);
      userFormData.append("profilePic", formData.profilePic);

      const { data } = await axios.post("/api/v1/signup", userFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: (data: any) => {
      console.log(data);

      toast.success(data.message);
      signup({
        id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        profilePic: data.data.profilePic,
        token: data.token,
      });
      router.push("/agency-setup");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to create account");
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
    handleFileChange,
    handleOnSubmit,
  };
};

export default useSignup;
