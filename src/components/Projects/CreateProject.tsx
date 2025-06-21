"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "../Spinner";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useCreateProject, { ProjectStatus } from "@/hooks/api/useCreateProject";
import useClientStore from "@/store/useClientStore";

const CreateProject = () => {
  const { formData, handleOnChange, handleOnSubmit, setFormData, loading } =
    useCreateProject();
  const getClients = useClientStore((state) => state.getClients());

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleOnSubmit} className="space-y-4">
          <div>
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              name="projectName"
              placeholder="Project Name"
              className="col-span-3"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label htmlFor="projectBudget">Project Budget</Label>
            <Input
              id="projectBudget"
              name="projectBudget"
              placeholder="$1000"
              className="col-span-3"
              type="number"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label htmlFor="projectStauts">Project Status</Label>
            <Select
              value={formData.clientName}
              onValueChange={(value: string) =>
                setFormData((prev: any) => ({
                  ...prev,
                  clientName: value,
                }))
              }
            >
              <SelectTrigger id="clientSelect">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {getClients?.map((client: any) => (
                  <SelectItem key={client?._id} value={client?.clientName}>
                    {client.clientName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="projectStauts">Project Status</Label>
            <Select
              value={formData.projectStatus}
              onValueChange={(value: string) =>
                setFormData((prev: any) => ({
                  ...prev,
                  status: value as ProjectStatus,
                }))
              }
            >
              <SelectTrigger id="projectStauts">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ProjectStatus.PENDING}>Pending</SelectItem>
                <SelectItem value={ProjectStatus.IN_PROGRESS}>
                  In Progress
                </SelectItem>
                <SelectItem value={ProjectStatus.COMPLETED}>
                  Completed
                </SelectItem>
                <SelectItem value={ProjectStatus.ON_HOLD}>On Hold</SelectItem>
                <SelectItem value={ProjectStatus.CANCELLED}>
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">
              {loading ? (
                <>
                  <Spinner />
                  Add Project
                </>
              ) : (
                "Add Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
