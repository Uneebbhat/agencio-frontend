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
import ClientsTableSkeleton from "./ClientsTableSkeleton";
import ClientsTableError from "./ClientsTableError";
import EditClient from "./EditClient";
import useDeleteClient, {
  DeleteClientProps,
} from "@/hooks/api/useDeleteClient";
import { ClientStatus } from "@/store/useClientStore";
import useGetAllClients from "@/hooks/api/useGetAllClients";

export interface ClientTableProps {
  _id: string;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  status: ClientStatus;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

interface ClientsTablePropsInput {
  searchQuery: string;
}

const ClientsTable = ({ searchQuery }: ClientsTablePropsInput) => {
  const { clientsData, loading, error } = useGetAllClients();
  const [filteredClients, setFilteredClients] = useState<ClientTableProps[]>(
    []
  );
  const [selectedClient, setSelectedClient] = useState<ClientTableProps | null>(
    null
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { handleOnSubmit } = useDeleteClient();
  // const { clients } = useClientStore();
  useEffect(() => {
    if (clientsData) {
      setFilteredClients(
        clientsData.filter((client: ClientTableProps) =>
          client.clientName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [clientsData, searchQuery]);

  if (loading) return <ClientsTableSkeleton />;
  if (error) return <ClientsTableError />;

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
          {filteredClients.length > 0 ? (
            filteredClients.map((client: ClientTableProps) => (
              <TableRow key={client._id}>
                <TableCell className="font-medium">
                  {client.clientName}
                </TableCell>
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
                          setSelectedClient(client as ClientTableProps);
                          setIsEditOpen(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleOnSubmit(
                            client._id as unknown as DeleteClientProps
                          )
                        }
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                <p className="text-gray-500">No clients found</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Edit Client Modal */}
      {isEditOpen && (
        <EditClient
          client={selectedClient as ClientTableProps}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </section>
  );
};

export default ClientsTable;
