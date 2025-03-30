import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Agency } from "./useAgencyStore";

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  profilePic: string;
  token: string;
}

interface UserStore {
  user: User | null;
  agency?: Agency | null;
  login: (userData: User) => void;
  signup: (userData: User) => void;
  logout: () => void;
  getUser: () => User | null;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      agency: null,
      login: (userData) => set({ user: userData }),
      signup: (userData) => set({ user: userData }),
      logout: () => set({ user: null, agency: null }),
      getUser: () => get().user,
    }),
    {
      name: "userStore",
    }
  )
);

export default useUserStore;
