import { create } from "zustand";

export const useGlobalStyle = create((set) => ({
    style: "light",
    
    setStyle: (style) => set({ style }),
}))