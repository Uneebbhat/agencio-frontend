import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchClients = async () => {
  // throw new Error("Simulated API error");
  const { data } = await axios.get("/api/v1/get-clients");
  return data.data.allClients;
};

const useGetAllClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    retry: false,
  });
};

export default useGetAllClients;
