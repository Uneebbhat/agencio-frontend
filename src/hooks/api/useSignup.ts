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
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const userFormData = new FormData();
      // userFormData.append("profilePic", formData.profilePic);
      // userFormData.append("name", formData.name);
      // userFormData.append("email", formData.email);
      // userFormData.append("password", formData.password);

      const res = await axios.post("/api/v1/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log(res.data);

      toast.success(res.data.message);
      signup({
        id: res.data.data._id,
        name: res.data.data.name,
        email: res.data.data.email,
        password: res.data.data.password,
        token: res.data.token,
      });

      console.log(formData);
      router.push("/launchpad");
    } catch (error: any) {
      toast.error(error.response.data.error);
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
