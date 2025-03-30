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

const CreateClient = () => {
  const { formData, handleOnChange, handleOnSubmit, setFormData, loading } =
    useCreateClient();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleOnSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                name="clientName"
                placeholder="John Doe"
                className="col-span-3"
                onChange={handleOnChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                name="clientEmail"
                placeholder="johndoe@example.com"
                className="col-span-3"
                onChange={handleOnChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status">Status</Label>
              <div className="relative col-span-3">
                <Input
                  id="status"
                  name="status"
                  value={formData.status || ""}
                  readOnly
                  className="cursor-pointer"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="absolute inset-y-0 right-0 px-2"
                    >
                      ▼
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem
                      onClick={() =>
                        setFormData({ ...formData, status: "Active" })
                      }
                    >
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setFormData({ ...formData, status: "Inactive" })
                      }
                    >
                      Inactive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {loading ? (
                <>
                  <Spinner />
                  Add Client
                </>
              ) : (
                "Add Client"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClient;
