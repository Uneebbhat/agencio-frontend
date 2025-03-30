import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DeleteClientProps {
  clientId: string;
}

const useDeleteClient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteClient"],
    mutationFn: async ({ clientId }: DeleteClientProps) => {
      const { data } = await axios.delete(
        `/api/v1/delete-client?clientId=${clientId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error) => {
      console.error("Error deleting client:", error);
    },
  });

  const handleOnSubmit = (clientId: string) => {
    if (!clientId) {
      console.error("Client ID is required for deletion");
      return;
    }
    mutation.mutate({ clientId });
  };

  return { handleOnSubmit };
};

export default useDeleteClient;
