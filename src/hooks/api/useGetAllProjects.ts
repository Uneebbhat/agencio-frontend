"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Project {
  // Define the properties based on your API response
  [key: string]: unknown;
}

const useGetAllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/get-all-projects"
        );
        setProjects(data.data);
        console.log(data.data);
      } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
          const err = error as { response?: { data?: { error?: string } } };
          toast.error(
            err.response?.data?.error ||
              "An error occurred while creating the client."
          );
        } else {
          toast.error("An error occurred while creating the client.");
        }
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
