import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import useFormHandler from "../useFormHandler";
import useAgencyStore from "@/store/useAgencyStore";
import axios from "axios";
import useUserStore from "@/store/useUserStore";

interface CreateCompanyFormData {
  agencyLogo?: File | null;
  agencyName: string;
  agencyEmail: string;
  agencyWebsite?: string;
  agencyPhone: string;
  agencySize: number;
  industry: string;
  userId: string;
}

const useCreateAgency = () => {
  const router = useRouter();
  const { formData, setFormData, handleOnChange } =
    useFormHandler<CreateCompanyFormData>({
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData({ ...formData, agencyLogo: files[0] });
    } else {
      setFormData({ ...formData, agencyLogo: null });
    }
  };

  const mutation = useMutation({
    mutationKey: ["createAgency"],
    mutationFn: async () => {
      if (!user?.id) {
        throw new Error("User ID is missing.");
      }

      const agencyFormData = new FormData();
      agencyFormData.append("agencyLogo", formData.agencyLogo as File);
      agencyFormData.append("agencyName", formData.agencyName);
      agencyFormData.append("agencyEmail", formData.agencyEmail);
      agencyFormData.append("agencyWebsite", formData.agencyWebsite || "");
      agencyFormData.append("agencyPhone", formData.agencyPhone);
      agencyFormData.append("agencySize", formData.agencySize.toString());
      agencyFormData.append("industry", formData.industry);
      agencyFormData.append("userId", user.id);

      const { data } = await axios.post(
        "/api/v1/create-agency",
        agencyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    },
    onSuccess: (data) => {
      console.log("Agency created successfully:", data);
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
      router.push("/launchpad");
    },
    onError: (error) => {
      console.error("Error creating agency:", error);
    },
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
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

export default useCreateAgency;
