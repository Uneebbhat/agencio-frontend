"use client";

import { useState } from "react";
import { toast } from "sonner";
import useFormHandler from "@/hooks/useFormHandler";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import axios from "axios";

interface SignupFormDataProps {
  name: string;
  email: string;
  password: string;
  profilePic: File | null;
  [key: string]: unknown;
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
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userFormData = new FormData();
      userFormData.append("name", formData.name);
      userFormData.append("email", formData.email);
      userFormData.append("password", formData.password);
      userFormData.append("profilePic", formData.profilePic);

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/signup",
        userFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      signup({
        id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        profilePic: data.data.profilePic,
        token: data.token,
      });

      toast.success(data.message);

      router.push("/agency-setup");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { error?: string } } };
        toast.error(err.response?.data?.error || "Failed to create account");
      } else {
        toast.error("Failed to create account");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleOnChange,
    handleFileChange,
    handleOnSubmit,
  };
};

export default useSignup;
