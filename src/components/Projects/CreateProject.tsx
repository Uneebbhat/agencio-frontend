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
import { useState } from "react";
import useCreateClient from "@/hooks/api/useCreateClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Spinner from "../Spinner";
import { Plus } from "lucide-react";

const CreateProject = () => {
  // const { formData, handleOnChange, handleOnSubmit, setFormData, loading } =
  //   useCreateClient();

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
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form
        // onSubmit={handleOnSubmit}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="Project Name"
                className="col-span-3"
                // onChange={handleOnChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="projectBudget">Project Budget</Label>
              <Input
                id="projectBudget"
                name="projectBudget"
                placeholder="$1000"
                className="col-span-3"
                type="number"
                // onChange={handleOnChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {/* {loading ? (
                <>
                  <Spinner />
                  Add Client
                </>
              ) : (
                "Add Client"
              )} */}
              Add Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
