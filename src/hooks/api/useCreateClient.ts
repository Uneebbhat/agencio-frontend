import axios from "axios";
import useFormHandler from "../useFormHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAgencyStore from "@/store/useAgencyStore";
import useClientStore from "@/store/useClientStore";
import { useState } from "react";
import { toast } from "sonner";

interface CreateClientProps {
  agencyId: string;
  clientName: string;
  clientEmail: string;
  status: string;
}

const useCreateClient = () => {
  const { formData, setFormData, handleOnChange } =
    useFormHandler<CreateClientProps>({
      agencyId: "",
      clientName: "",
      clientEmail: "",
      status: "",
    });
  const { agency } = useAgencyStore();
  const queryClient = useQueryClient();
  const client = useClientStore((state) => state.addClient);
  const [loading, setloading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);

    try {
      const { data } = await axios.post("/api/v1/create-client", {
        agencyId: agency?.id,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        status: formData.status,
      });
      console.log(data);

      client({
        agencyId: agency?.id as string,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        status: formData.status as any,
        id: data.data._id,
      });
      toast.success(data.message);
      window.location.reload();
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.error ||
          "An error occurred while creating the client."
      );
    } finally {
      setloading(false);
    }
  };

  return {
    formData,
    loading,
    handleOnChange,
    handleOnSubmit,
    setFormData,
  };
};

export default useCreateClient;
