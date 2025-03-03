import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type ClientStatus = "Active" | "Inactive";

interface Clients {
  id: string;
  company: string;
  email: string;
  dateJoined: string;
  status: ClientStatus;
}

const ClientsTable = () => {
  const clients: Clients[] = [
    {
      id: "1",
      company: "MicroSoft",
      email: "microsoft@gmail.com",
      dateJoined: "25 Feb 2025",
      status: "Active",
    },
    {
      id: "2",
      company: "Amazon",
      email: "amazon@gmail.com",
      dateJoined: "25 Mar 2025",
      status: "Active",
    },
    {
      id: "3",
      company: "Facebook",
      email: "facebook@gmail.com",
      dateJoined: "2 Jan 2025",
      status: "Inactive",
    },
  ];

  return (
    <section className="p-[20px]">
      <Table>
        <TableCaption>A list of your recent clients.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium flex items-center gap-[5px]">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {client.company}
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.dateJoined}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    client.status === "Active"
                      ? "bg-green-200 text-green-800 border border-green-600"
                      : "bg-red-200 text-red-800 border border-red-600"
                  )}
                >
                  {client.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default ClientsTable;
