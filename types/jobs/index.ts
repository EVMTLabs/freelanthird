import type { Category, Job as PrismaJob, Skill, User } from '@prisma/client';

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
  skills?: Skill[];
}

export interface DetailedJob extends PrismaJob {
  user: User;
  category: JobCategory;
  skills: Skill[];
}
