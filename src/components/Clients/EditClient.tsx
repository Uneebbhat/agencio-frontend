// components/EditClient.tsx

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useEditClient from "@/hooks/api/useEditClient";
import { ClientStatus } from "@/store/useClientStore";

interface EditClientProps {
  client: {
    _id: string;
    clientName: string;
    clientEmail: string;
    status: ClientStatus;
  };
  isOpen: boolean;
  onClose: () => void;
}

const EditClient: React.FC<EditClientProps> = ({ client, isOpen, onClose }) => {
  const { formData, handleOnChange, setFormData, handleOnEditSubmit, loading } =
    useEditClient();

  useEffect(() => {
    if (client) {
      setFormData({
        clientId: client._id,
        clientName: client.clientName,
        clientEmail: client.clientEmail,
        status: client.status,
      });
    }
  }, [client, setFormData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleOnEditSubmit} className="space-y-4">
          <div>
            <Label htmlFor="clientName">Company Name</Label>
            <Input
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              name="clientEmail"
              type="email"
              value={formData.clientEmail}
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) =>
                setFormData((prev) => ({
                  ...prev,
                  status: value as ClientStatus,
                }))
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ClientStatus.ACTIVE}>Active</SelectItem>
                <SelectItem value={ClientStatus.INACTIVE}>Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClient;
