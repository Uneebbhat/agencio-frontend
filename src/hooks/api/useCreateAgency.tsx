import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import useFormHandler from "../useFormHandler";
import useCompanyStore from "@/store/useAgencyStore";

interface CreateCompanyFormData {
  agencyLogo?: File | null;
  agencyName: string;
  agencyEmail: string;
  agencyWebsite?: string;
  agencyPhone: string;
  agencySize: number;
  industry: string;
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
    });

  const { createAgency } = useCompanyStore();

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
      const fakeData = {
        industry: formData.industry,
        agencyPhone: formData.agencyPhone,
        agencySize: formData.agencySize,
        agencyName: formData.agencyName,
        agencyWebsite: formData.agencyWebsite,
        agencyEmail: formData.agencyEmail,
        agencyLogo: formData.agencyLogo,
      };
      return fakeData;
    },
    onSuccess: (data) => {
      console.log("Agency created successfully:", data);
      createAgency({
        id: "1",
        agencyName: formData.agencyName,
        agencyEmail: formData.agencyEmail,
        agencyWebsite: formData.agencyWebsite,
        agencyPhone: formData.agencyPhone,
        agencySize: formData.agencySize,
        agencyLogo: formData.agencyLogo,
        industry: formData.industry,
        token: "token",
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
