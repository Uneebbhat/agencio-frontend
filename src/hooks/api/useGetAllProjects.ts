"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const useGetAllProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/get-all-projects");
        setProjects(data.data);
        console.log(data.data);
      } catch (error: any) {
        console.log(error);

        toast.error(
          error.response?.data?.error ||
            "An error occurred while creating the client."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAllProjects();
  }, []);

  return {
    projects,
    loading,
  };
};

export default useGetAllProjects;
