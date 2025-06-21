import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import useUserStore from "@/store/useUserStore";

const useLogout = () => {
  const { logout } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const { data } = await axios.post("/api/v1/logout");
      toast.success(data.message || "Logout successful");
      logout();
      setIsSuccess(true);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { error?: string } } };
        toast.error(
          err.response?.data?.error || "An error occurred during logout"
        );
        setIsError(true);
      } else {
        toast.error("An error occurred during logout");
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout: handleLogout,
    isLoading,
    isSuccess,
    isError,
  };
};

export default useLogout;
