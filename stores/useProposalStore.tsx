import { create } from 'zustand';

import type { Proposal } from '@/types/proposals';

interface ProposalState {
  proposals: Proposal[];
  addProposals: (proposal: Proposal[]) => void;
  index: number;
  setIndex: (index: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useProposalStore = create<ProposalState>((set) => ({
  index: 1,
  proposals: [],
  addProposals: (proposal: Proposal[]) => {
    set(() => ({ proposals: [...proposal] }));
  },
  setIndex: (index: number) => {
    set({ index });
  },
  isLoading: true,
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
}));
