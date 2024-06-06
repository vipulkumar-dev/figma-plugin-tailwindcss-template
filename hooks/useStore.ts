import { create } from "zustand";

interface fontMappingState {
  fontMapping: object;
  setFontMapping: (fontMap: any) => void;
}

const useStore = create<fontMappingState>()((set) => ({
  fontMapping: null,
  setFontMapping: (fontMap) => set(() => ({ fontMapping: fontMap })),
}));

export default useStore;
