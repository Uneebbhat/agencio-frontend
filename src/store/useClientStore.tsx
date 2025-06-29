import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum ClientStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export interface Client {
  agencyId: string;
  _id: string;
  clientName: string;
  clientEmail: string;
  status: ClientStatus;
}

interface ClientsStore {
  clients: Client[];
  addClient: (client: Client) => void;
  removeClient: (clientId: string) => void;
  updateClient: (clientId: string, updatedClient: Partial<Client>) => void;
  getClients: () => Client[] | null;
}

const useClientStore = create<ClientsStore>()(
  persist(
    (set, get) => ({
      clients: [],

      getClients: () => get().clients,

      addClient: (clientData) =>
        set((state) => ({ clients: [...state.clients, clientData] })),

      removeClient: (clientId) =>
        set((state) => ({
          clients: state.clients.filter((client) => client._id !== clientId),
        })),

      updateClient: (clientId, updatedClient) =>
        set((state) => ({
          clients: state.clients.map((client) =>
            client._id === clientId ? { ...client, ...updatedClient } : client
          ),
        })),
    }),
    {
      name: "clientsStore",
    }
  )
);

export default useClientStore;
