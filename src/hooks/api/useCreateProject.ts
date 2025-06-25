import { toast } from "sonner";
import useFormHandler from "../useFormHandler";
import { useState } from "react";
import axios from "axios";
import useAgencyStore from "@/store/useAgencyStore";

export enum ProjectStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  ON_HOLD = "On Hold",
  CANCELLED = "Cancelled",
}

interface CreateProjectProps {
  agencyId: string;
  clientName: string;
  projectName: string;
  projectStatus: ProjectStatus;
  projectBudget: number;
  [key: string]: unknown;
}

const useCreateProject = () => {
  const { formData, handleOnChange, setFormData } =
    useFormHandler<CreateProjectProps>({
      agencyId: "",
      clientName: "",
      projectName: "",
      projectBudget: 0,
      projectStatus: ProjectStatus.IN_PROGRESS,
    });
  const [loading, setLoading] = useState<boolean>(false);
  const { agency } = useAgencyStore();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/create-project",
        {
          agencyId: agency?.id,
          clientName: formData.clientName,
          projectName: formData.projectName,
          projectStatus: formData.projectStatus,
          projectBudget: formData.projectBudget,
        }
      );
      console.log(data);
      window.location.reload();
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

  return {
    formData,
    handleOnChange,
    handleOnSubmit,
    loading,
    setFormData,
  };
};

export default useCreateProject;
