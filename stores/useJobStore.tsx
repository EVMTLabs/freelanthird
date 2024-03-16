import { create } from 'zustand';

import type { DetailedJob } from '@/types/jobs';

interface JobsState {
  jobsList: DetailedJob[];
  addJobs: (jobs: DetailedJob[]) => void;
  filterByCategory: (id: string) => void;
  idsToFilter: string[];
}

export const useJobStore = create<JobsState>((set) => ({
  jobsList: [],
  idsToFilter: [],
  addJobs: (jobs: DetailedJob[]) => {
    set((state) => ({ jobsList: [...state.jobsList, ...jobs] }));
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
