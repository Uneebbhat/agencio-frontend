import useClientStore from "@/store/useClientStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteClientProps {
  clientId: string;
}

const useDeleteClient = () => {
  const [loading, setLoading] = useState<boolean>(false);

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

      window.location.reload();
    } catch (error: any) {
      console.error("Error deleting client:", error.response || error);
      toast.error(
        error.response?.data?.error ||
          "An error occurred while deleting the client."
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleOnSubmit, loading };
};

export default useDeleteClient;
