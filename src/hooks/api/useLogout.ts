import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import useUserStore from "@/store/useUserStore";

const useLogout = () => {
  const { logout } = useUserStore();

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const { data } = await axios.post("/api/v1/logout");
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Logout successful");
      logout();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error || "An error occurred during logout"
      );
    },
  });

  return {
    logout: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useLogout;
