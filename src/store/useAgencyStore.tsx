import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Agency {
  id: string;
  agencyLogo?: File | null;
  agencyName: string;
  agencyEmail: string;
  agencyWebsite?: string;
  agencyPhone: string;
  industry: string;
  agencySize: number;
  token: string;
}

interface AgencyStore {
  agency: Agency | null;
  createAgency: (agencyData: Agency) => void;
  getAgency: () => Agency | null;
}

const useAgencyStore = create<AgencyStore>()(
  persist(
    (set, get) => ({
      agency: null,
      createAgency: (createAgencyData) => set({ agency: createAgencyData }),
      getAgency: () => get().agency,
    }),
    {
      name: "agencyStore",
    }
  )
);

export default useAgencyStore;
