import useClientStore from "@/store/useClientStore";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export interface DeleteClientProps {
  clientId: string;
}

const useDeleteClient = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { removeClient } = useClientStore();

  const handleOnSubmit = async (clientId: DeleteClientProps) => {
    if (!clientId) {
      console.error("Client ID is required for deletion");
      toast.error("Client ID is missing!");
    }

    setLoading(true);

    try {
      const { data } = await axios.delete(
        `/api/v1/delete-client?clientId=${clientId}`
      );
      toast.success(data.message || "Client deleted successfully!");

      removeClient((clientId as DeleteClientProps).clientId);

      window.location.reload();
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { error?: string } } };
        console.error("Error deleting client:", err.response || error);
        toast.error(
          err.response?.data?.error ||
            "An error occurred while deleting the client."
        );
      } else {
        toast.error("An error occurred while deleting the client.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleOnSubmit, loading };
};

export default useDeleteClient;
