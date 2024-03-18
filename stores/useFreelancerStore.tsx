import { create } from 'zustand';

import type { Freelancer } from '@/types/users';

interface FreelancerState {
  freelancerList: Freelancer[];
  addFreelancers: (freelancers: Freelancer[]) => void;
  filterByCategory: (id: string) => void;
  idsToFilter: string[];
}

export const useFreelancerStore = create<FreelancerState>((set) => ({
  freelancerList: [],
  idsToFilter: [],
  addFreelancers: (freelancers: Freelancer[]) => {
    set((state) => ({
      freelancerList: [...state.freelancerList, ...freelancers],
    }));
  },
  filterByCategory: (id: string) => {
    set((state) => {
      if (state.idsToFilter.includes(id)) {
        return { idsToFilter: state.idsToFilter.filter((i) => i !== id) };
      }
      return { idsToFilter: [...state.idsToFilter, id] };
    });
  },
}));
