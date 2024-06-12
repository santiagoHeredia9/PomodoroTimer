import { create } from "zustand";

export const useGlobalLanguage = create((set) => ({
    language: "es",
    setLanguage: (language) => set((state) => ({ language })),
}));