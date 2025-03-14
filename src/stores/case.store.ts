import { createStore } from 'zustand/vanilla';
import { type PaginatedResult } from '@/lib/data';

export type Case = {
  uid: string;
  name: string;
  close_date: string;
  description: string;
  proof_needed: boolean;
  due_date: number;
  price: number;
};

export type CaseState = {
  cases: Case[];
  selectedCases: string[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  isLoading: boolean;
};

export type CaseActions = {
  toggleCase: (caseUid: string) => void;
  loadMoreCases: () => Promise<void>;
};

export type CaseStore = CaseState & CaseActions;

export const initCaseStore = (data?: PaginatedResult): CaseState => ({
  cases: data?.cases ?? [],
  selectedCases: [],
  currentPage: data?.page ?? 1,
  itemsPerPage: data?.pageSize ?? 10,
  totalPages: data?.totalPages ?? 0,
  isLoading: false,
});

export const defaultInitState: CaseState = initCaseStore();

export const createCaseStore = (initState: CaseState = defaultInitState) => {
  return createStore<CaseStore>()((set, get) => ({
    ...initState,

    toggleCase: (caseUid: string) =>
      set((state) => {
        const isSelected = state.selectedCases.includes(caseUid);
        return {
          selectedCases: isSelected
            ? state.selectedCases.filter((id) => id !== caseUid)
            : [...state.selectedCases, caseUid],
        };
      }),

    loadMoreCases: async () => {
      const { currentPage, itemsPerPage, totalPages, cases } = get();

      if (currentPage >= totalPages) return; // No more pages to load

      set({ isLoading: true });

      try {
        const response = await fetch(
          `/api/cases?page=${currentPage + 1}&pageSize=${itemsPerPage}`,
        );
        const data: PaginatedResult = await response.json();

        set({
          cases: [...cases, ...data.cases],
          currentPage: data.page,
          totalPages: data.totalPages,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to load more cases:', error);
        set({ isLoading: false });
      }
    },
  }));
};
