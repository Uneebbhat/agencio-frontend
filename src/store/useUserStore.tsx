import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  token: string;
}

interface UserStore {
  user: User | null;
  login: (userData: User) => void;
  signup: (userData: User) => void;
  logout: () => void;
  getUser: () => User | null;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      signup: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
      getUser: () => get().user,
    }),
    {
      name: "userStore",
    }
  )
);

export default useUserStore;
