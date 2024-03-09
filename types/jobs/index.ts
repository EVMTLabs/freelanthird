import type { Category, Skill } from '@prisma/client';

export interface Job {
  title: string;
  description: string;
  category: string;
  skills: string[];
  size: string;
  duration: string;
  experience: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface JobCategory extends Category {
  skills: Skill[];
}
