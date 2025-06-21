import useClientStore, { ClientStatus } from "@/store/useClientStore";
import useFormHandler from "../useFormHandler";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";

interface EditClientProps {
  clientId: string;
  clientName: string;
  clientEmail: string;
  status: ClientStatus;
  [key: string]: unknown;
}

const useEditClient = () => {
  const { formData, handleOnChange, setFormData } =
    useFormHandler<EditClientProps>({
      clientId: "",
      clientName: "",
      clientEmail: "",
      status: ClientStatus.ACTIVE,
    });
  const [loading, setLoading] = useState<boolean>(false);
  const { clients } = useClientStore();
  console.log(clients);

  useEffect(() => {
    if (clients.length > 0) {
      const client = clients.find((c) => c._id === formData.clientId);
      if (client) {
        setFormData({
          clientId: client._id,
          clientName: client.clientName,
          clientEmail: client.clientEmail,
          status: client.status,
        });
      }
    }
  }, [clients, formData.clientId, setFormData]);

  const handleOnEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(`/api/v1/edit-client`, {
        clientId: formData.clientId,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        status: formData.status,
      });

      toast.success(data.message || "Client updated successfully");

      window.location.reload();
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { error?: string } } };
        toast.error(err.response?.data?.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleOnChange,
    setFormData,
    handleOnEditSubmit,
    loading,
  };
};

export default useEditClient;
