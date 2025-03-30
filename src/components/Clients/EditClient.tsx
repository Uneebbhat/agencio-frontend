import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const EditClient = ({ client, isOpen, onClose }: any) => {
  const [status, setStatus] = useState(client?.status || "Active");
  const [clientName, setClientName] = useState(client?.clientName || "");
  const [clientEmail, setClientEmail] = useState(client?.clientEmail || "");

  // Update state when client data changes
  useEffect(() => {
    setClientName(client?.clientName || "");
    setClientEmail(client?.clientEmail || "");
    setStatus(client?.status || "Active");
  }, [client]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="John Doe"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="johndoe@example.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status">Status</Label>
            <Input id="status" value={status} readOnly className="col-span-3" />

            {/* Status selection */}
            <div className="col-span-4 flex gap-2">
              <span
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition",
                  status === "Active"
                    ? "bg-green-200 text-green-800 border border-green-600"
                    : "bg-gray-200 text-gray-800"
                )}
                onClick={() => setStatus("Active")}
              >
                Active
              </span>
              <span
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition",
                  status === "Inactive"
                    ? "bg-red-200 text-red-800 border border-red-600"
                    : "bg-gray-200 text-gray-800"
                )}
                onClick={() => setStatus("Inactive")}
              >
                Inactive
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditClient;
