import axios, { AxiosError } from "axios";
import useFormHandler from "../useFormHandler";
import useAgencyStore from "@/store/useAgencyStore";
import useClientStore, { ClientStatus } from "@/store/useClientStore";
import { useState } from "react";
import { toast } from "sonner";

interface CreateClientProps {
  agencyId: string;
  clientName: string;
  clientEmail: string;
  status: ClientStatus;
  [key: string]: unknown;
}

const useCreateClient = () => {
  const { formData, setFormData, handleOnChange } =
    useFormHandler<CreateClientProps>({
      agencyId: "",
      clientName: "",
      clientEmail: "",
      status: ClientStatus.ACTIVE,
    });
  const { agency } = useAgencyStore();
  const client = useClientStore((state) => state.addClient);
  const [loading, setloading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/create-client",
        {
          agencyId: agency?.id,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          status: formData.status,
        }
      );
      console.log(data);

      client({
        agencyId: agency?.id as string,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        status: formData.status,
        _id: data.data._id,
      });
      toast.success(data.message);
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        if (
          (error as AxiosError).isAxiosError &&
          (error as AxiosError).response
        ) {
          const errData = (error as AxiosError).response?.data as
            | { error?: string }
            | undefined;
          toast.error(
            errData?.error || "An error occurred while creating the client."
          );
        } else {
          toast.error("An error occurred while creating the client.");
        }
      }
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
