import type { Category, Job as PrismaJob, Skill } from '@prisma/client';

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

export interface JobCard {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  minPrice: number;
  maxPrice: number;
  skills: { id: string; name: string }[];
}

export interface JobCategory extends Category {
  skills?: Skill[];
}

export interface DetailedJob extends PrismaJob {
  user: {
    username: string | null;
    avatar: string | null;
  };
  category: JobCategory;
  skills: Skill[];
}
