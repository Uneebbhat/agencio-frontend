"use client";

import useFormHandler from "@/hooks/useFormHandler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import axios from "axios";
import { useState } from "react";
import useAgencyStore from "@/store/useAgencyStore";
import useClientStore from "@/store/useClientStore";

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
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserStore();
  const { createAgency } = useAgencyStore();
  const { addClient } = useClientStore();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/v1/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log(data);

      login({
        id: data.data.userDTO._id,
        name: data.data.userDTO.name,
        email: data.data.userDTO.email,
        profilePic: data.data.userDTO.profilePic,
        token: data.token,
      });

      createAgency({
        userId: user?.id as string,
        id: data.data.agency._id,
        agencyName: data.data.agency.agencyName,
        agencyEmail: data.data.agency.agencyEmail,
        agencyWebsite: data.data.agency.agencyWebsite,
        agencyPhone: data.data.agency.agencyPhone,
        agencySize: data.data.agency.agencySize,
        agencyLogo: data.data.agency.agencyLogo,
        industry: data.data.agency.industry,
        token: data.token,
      });

      addClient({
        agencyId: data.data.clients._id,
        clientName: data.data.clients.clientName,
        clientEmail: data.data.clients.clientEmail,
        status: data.data.clients.status,
        id: data.data.clients._id,
      });

      toast.success(data.message);

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useLogin;
