import type { MetadataRoute } from 'next';

import { findJobsMetadata } from '@/actions/jobs';
import { findUsersMetadata } from '@/actions/users';
import { slugify } from '@/utils/slugify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://freelanthird.com';

  const jobs = await findJobsMetadata();
  const users = await findUsersMetadata();

  return [
    {
      url: url,
      priority: 1,
    },
    {
      url: `${url}/freelancers`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...jobs.map((job) => ({
      url: `${url}/jobs/${slugify(job.title)}/${job.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      lastModified: job.createdAt,
    })),
    ...users.map((user) => ({
      url: `${url}/users/${user.username}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      lastModified: user.createdAt,
    })),
    {
      url: `${url}/find-work`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${url}/proposals`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${url}/create-job`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${url}/help`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
