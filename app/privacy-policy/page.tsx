import { unstable_noStore as noStore } from 'next/cache';

import { CustomMDX } from '@/components/CustomMDX/CustomMDX';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { getPrivacyPolicy } from '@/config/mdx';

function formatDate(date: string) {
  noStore();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `${fullDate}`;
}

export default function PrivacyPage() {
  const post = getPrivacyPolicy();

  return (
    <MainLayout>
      <article className="prose prose-quoteless prose-neutral mx-auto text-lg max-w-2xl">
        <h1 className="text-4xl font-medium mt-10 mb-8">
          {post.metadata.title}
        </h1>
        <p className="text-lg mb-4">
          Last modified: <em>{formatDate(post.metadata.publishedAt)}</em>
        </p>
        <CustomMDX source={post.content} />
      </article>
    </MainLayout>
  );
}
