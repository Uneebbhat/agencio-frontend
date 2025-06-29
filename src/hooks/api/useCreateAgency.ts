import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useFormHandler from "../useFormHandler";
import useAgencyStore from "@/store/useAgencyStore";
import axios from "axios";
import useUserStore from "@/store/useUserStore";
import { toast } from "sonner";

const useCreateAgency = () => {
  const router = useRouter();
  const { formData, setFormData, handleOnChange } = useFormHandler({
    agencyLogo: null,
    agencyName: "",
    agencyEmail: "",
    agencyWebsite: "",
    agencyPhone: "",
    agencySize: 0,
    industry: "",
    userId: "",
  });
  const { createAgency } = useAgencyStore();
  const { user } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData({ ...formData, agencyLogo: files[0] });
    } else {
      setFormData({ ...formData, agencyLogo: null });
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const agencyFormData = new FormData();
      agencyFormData.append("agencyLogo", formData.agencyLogo as File);
      agencyFormData.append("agencyName", formData.agencyName);
      agencyFormData.append("agencyEmail", formData.agencyEmail);
      agencyFormData.append("agencyWebsite", formData.agencyWebsite || "");
      agencyFormData.append("agencyPhone", formData.agencyPhone);
      agencyFormData.append("agencySize", formData.agencySize.toString());
      agencyFormData.append("industry", formData.industry);
      agencyFormData.append("userId", user!.id);

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/create-agency",
        agencyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      createAgency({
        userId: user?.id as string,
        id: data.data._id,
        agencyName: data.data.agencyName,
        agencyEmail: data.data.agencyEmail,
        agencyWebsite: data.data.agencyWebsite,
        agencyPhone: data.data.agencyPhone,
        agencySize: data.data.agencySize,
        agencyLogo: data.data.agencyLogo,
        industry: data.data.industry,
        token: data.token,
      });

      toast.success(data.data.message || "Agecny created successfully");

      router.push("/launchpad");
    } catch (error: unknown) {
      // Fix: Properly access error response for Axios errors
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            "An error occurred while creating the agency."
        );
      } else {
        toast.error("An error occurred while creating the agency.");
      }
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

export default useCreateAgency;
