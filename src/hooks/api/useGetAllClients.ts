import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllClients = () => {
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchClientsData = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get("/api/v1/get-clients");
        setClientsData(data.data.allClients);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchClientsData();
  }, []);

  return { clientsData, loading, error };
};

export default useGetAllClients;
