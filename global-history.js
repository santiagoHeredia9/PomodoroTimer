import { create } from "zustand";

export const useGlobalHistory = create((set) => ({
  history: [],

  addEntry: (task, time) => {
    set((state) => ({
      history: [...state.history, { task, time }],
    }));
  },

  clear: () => set({ history: [] }),
}));
