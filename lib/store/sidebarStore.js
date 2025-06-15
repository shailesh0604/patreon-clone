import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  isToggled: false,
  toggleSidebar: () => set((state) => ({ isToggled: !state.isToggled })),
  setSidebar: (value) => set({ isToggled: value }),
}));

export default useSidebarStore;