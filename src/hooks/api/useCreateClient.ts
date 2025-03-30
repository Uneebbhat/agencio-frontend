import axios from "axios";
import useFormHandler from "../useFormHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAgencyStore from "@/store/useAgencyStore";
import useClientStore from "@/store/useClientStore";

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

  const mutation = useMutation({
    mutationKey: ["createClient"],
    mutationFn: async () => {
      const { data } = await axios.post("/api/v1/create-client", {
        agencyId: agency?.id,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        status: formData.status,
      });
      console.log(data);
      return data;
    },
    onSuccess: (data) => {
      console.log("Client created successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      client({
        agencyId: agency?.id as string,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        status: formData.status as any,
        id: data.data._id,
      });
    },
    onError: (error) => {
      console.error("Error creating client:", error);
    },
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return {
    formData,
    loading: mutation.isPending,
    handleOnChange,
    handleOnSubmit,
    setFormData,
  };
};

export default useCreateClient;
