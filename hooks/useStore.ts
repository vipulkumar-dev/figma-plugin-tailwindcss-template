import { create } from "zustand";

interface BearState {
  fontMapping: object;
  setFontMapping: (fontMap: any) => void;
}

const useStore = create<BearState>()((set) => ({
  fontMapping: null,
  setFontMapping: (fontMap) => set(() => ({ fontMapping: fontMap })),
}));

export default useStore;
