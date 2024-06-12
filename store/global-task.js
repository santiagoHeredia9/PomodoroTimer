import { create } from "zustand";

export const useGlobalTask = create((set) => ({
  data: "",
  currentTask: "",

  setData: (data) =>
    set({
      data: data,
    }),

  setCurrentTask: (data) =>
    set({
      currentTask: data,
    }),
}));
