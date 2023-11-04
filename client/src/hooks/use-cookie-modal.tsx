import { create } from 'zustand';

interface useCookieModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCookieModal = create<useCookieModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));