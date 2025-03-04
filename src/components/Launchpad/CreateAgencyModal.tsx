"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface CreateAgencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCreateAgency: () => void; // Accept the function
}
const CreateAgencyModal: React.FC<CreateAgencyModalProps> = ({
  isOpen,
  onClose,
  handleCreateAgency,
}) => {
  const [agencyData, setAgencyData] = useState({
    picture: "",
    name: "",
    email: "",
    owner: "",
    phone: "",
    size: "",
    location: "",
    zipcode: "",
    city: "",
    website: "",
    industry: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAgencyData({ ...agencyData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Your Agency</DialogTitle>
          <DialogDescription>
            Fill in the details to create your agency.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label>Agency Picture</Label>
            <Input type="file" name="picture" onChange={handleChange} />
            <Label>Agency Name</Label>
            <Input
              type="text"
              name="name"
              value={agencyData.name}
              onChange={handleChange}
            />
            <Label>Agency Email</Label>
            <Input
              type="email"
              name="email"
              value={agencyData.email}
              onChange={handleChange}
            />
            <Label>Agency Owner</Label>
            <Input
              type="text"
              name="owner"
              value={agencyData.owner}
              onChange={handleChange}
            />
            <Label>Phone Number</Label>
            <Input
              type="number"
              name="phone"
              value={agencyData.phone}
              onChange={handleChange}
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <Label>Company Size</Label>
            <Input
              type="number"
              name="size"
              value={agencyData.size}
              onChange={handleChange}
            />
            <Label>Industry</Label>
            <Input
              type="text"
              name="industry"
              value={agencyData.industry}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between">
          <DialogClose>
            <Button type="button" variant="secondary" onClick={onClose}>
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="default" onClick={handleCreateAgency}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgencyModal;
