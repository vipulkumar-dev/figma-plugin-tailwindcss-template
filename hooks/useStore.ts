import { create } from "zustand";

interface BearState {
  fontMapping: object;
  updateFontMapping: (fontMap: any) => void;
}

const useStore = create<BearState>()((set) => ({
  fontMapping: null,
  updateFontMapping: (fontMap) => set(() => ({ fontMapping: fontMap })),
}));

export default useStore;
