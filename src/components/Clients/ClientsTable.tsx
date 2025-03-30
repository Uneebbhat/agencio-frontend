import React, { useEffect, useState } from "react";
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
import { EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import useGetAllClients from "@/hooks/api/useGetAllClients";
import ClientsTableSkeleton from "./ClientsTableSkeleton";
import ClientsTableError from "./ClientsTableError";
import EditClient from "./EditClient";
import useDeleteClient from "@/hooks/api/useDeleteClient";
import useClientStore from "@/store/useClientStore";

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const ClientsTable = ({ searchQuery }: any) => {
  const { data: clients, isLoading, isError } = useGetAllClients();
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { handleOnSubmit } = useDeleteClient();
  const client = useClientStore((state) => state.clients);

  useEffect(() => {
    if (clients) {
      setFilteredClients(
        clients.filter((client: any) =>
          client.clientName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [clients, searchQuery]);

  if (isLoading) return <ClientsTableSkeleton />;
  if (isError) return <ClientsTableError />;

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
          {filteredClients.map((client: any) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.clientName}</TableCell>
              <TableCell>{client.clientEmail}</TableCell>
              <TableCell>{formatDate(client.createdAt)}</TableCell>
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
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedClient(client);
                        setIsEditOpen(true);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleOnSubmit(client.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Client Modal */}
      {isEditOpen && (
        <EditClient
          client={selectedClient}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </section>
  );
};

export default ClientsTable;
