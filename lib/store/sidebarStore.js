import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  // Sidebar state
  isToggled: false,
  toggleSidebar: () => set((state) => ({ isToggled: !state.isToggled })),
  setSidebar: (value) => set({ isToggled: value }),

  // User letter state
  userLetter: '',
  setUserLetter: (name) => {
    const firstLetter = name?.[0]?.toUpperCase() || '';
    set({ userLetter: firstLetter });
  },

}));

export default useSidebarStore;
