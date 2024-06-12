import { create } from "zustand";
import { workTime } from "../components/consts";

export const useGlobalCounter = create((set) => ({
  tiempoRestante: workTime,
  isRunning: false,
  whichRound: false,
  block: 0,
  completed: false,
  timeLapse: 0,

  setTiempoRestante: (modality) =>
    set({
      tiempoRestante: modality,
    }),

  setIsRunning: (modality) =>
    set({
      isRunning: modality,
    }),

  setIsBlock: (sum) =>
    set((state) => ({
      block: state.block + sum,
    })),

  setIsCompleted: () =>
    set((state) => ({
      completed: !state.completed,
    })),

  setWhichRound: () =>
    set((state) => ({
      whichRound: !state.whichRound,
    })),

  setTimeLapse: (tiempo) =>
    set({
      timeLapse: tiempo,
    }),
}));
