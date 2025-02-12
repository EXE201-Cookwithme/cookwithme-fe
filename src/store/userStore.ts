import { create } from "zustand";
import { UserBe } from "@/constants/types";

type UserState = {
  user: UserBe | null;
  setUser: (user: UserBe | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
