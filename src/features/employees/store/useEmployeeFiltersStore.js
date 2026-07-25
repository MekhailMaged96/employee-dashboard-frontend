import { create } from "zustand";

// Client-only UI state for the Employees table: search term + current page.
// Not server data (that's TanStack Query's job) — just what the user is looking at.
export const useEmployeeFiltersStore = create((set) => ({
  search: "",
  currentPage: 1,

  setSearch: (search) => set({ search, currentPage: 1 }), // reset page on new search
  setPage: (currentPage) => set({ currentPage }),
  reset: () => set({ search: "", currentPage: 1 }),
}));
