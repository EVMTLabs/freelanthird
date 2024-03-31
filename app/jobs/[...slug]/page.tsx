import Link from 'next/link';
import { redirect } from 'next/navigation';

import { findJobById } from '@/actions/jobs';
import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import { CreateProposal } from '@/components/CreateProposal/CreateProposal';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { PublishedAt } from '@/components/PublishedAt/PublishedAt';
import { EditorContentView } from '@/components/RichTextEditor/EditorContentView';
import { getServerSession } from '@/session/getServerSession';
import { slugify } from '@/utils/slugify';

import { JobStats } from './components/JobStats';

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const [, id] = params.slug;

  if (!id) {
    return redirect('/404');
  }

  const job = await findJobById(id);

  if (!job) {
    return redirect('/404');
  }

  return {
    title: job.title,
    description: job.description,
    referrer: 'origin-when-cross-origin',
    keywords: job.skills.map((skill) => skill.name),
    authors: [{ name: job.user.name }],
    creator: job.user.name,
    publisher: 'Freelanthird',
  };
}

export default async function JobPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const [, id] = params.slug;

  if (!id) {
    return redirect('/404');
  }

  const job = await findJobById(id);

  if (!job) {
    return redirect('/404');
  }

  const { address } = await getServerSession();

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Offer',
            name: job.title,
            datePublished: job.createdAt,
            dateModified: job.updatedAt,
            description: job.description,
            image: `https://freelanthird.com/og?title=${job.title}`,
            url: `https://freelanthird.com/jobs/${slugify(job.title)}/${job.id}`,
            price: `${job.minPrice} - ${job.maxPrice}`,
            author: {
              '@type': 'Person',
              name: job.user.name,
            },
          }),
        }}
      />
      <div className="grid grid-cols-12 my-10">
        <div className="col-span-12 px-5 order-2 lg:col-span-9 lg:order-1">
          <h1 className="text-2xl font-extrabold">{job.title}</h1>
          <div className="flex gap-2 mt-2">
            <PublishedAt date={job.createdAt} />
          </div>
          <div className="max-w-2xl">
            <JobStats
              duration={job.duration}
              size={job.size}
              experience={job.experience}
              location={job.location}
            />
            <EditorContentView description={job.description} />
          </div>
          <div className="mt-8 border-t pt-8 lg:hidden">
            <h2 className="text-2xl font-bold mb-2">Budget</h2>
            <p className="text-xl font-medium mb-4">
              ${job.minPrice} - ${job.maxPrice}
            </p>
            <CreateProposal jobId={job.id} clientAddress={job.wallet.address} />
          </div>
        </div>
        <div className="flex flex-col px-8 col-span-12 order-1 border-b pb-8 mb-8 lg:col-span-3 lg:order-2 lg:border-l lg:mb-0 lg:pb-0 lg:border-b-0">
          <Link href={`/users/${job.user.username}`} className="flex">
            <DefaultAvatar
              avatar={job.user.avatar}
              username={job.user.username}
              size="large"
              showRing
            />
            <div className="ml-4 mb-4">
              <p className="text-xl font-bold">{job.user.username}</p>
              <p className="text-sm text-gray-500">
                Member since {job.user.createdAt.getFullYear()}
              </p>
            </div>
          </Link>
          <div className="mt-8 hidden lg:block">
            <h2 className="text-2xl font-bold mb-2">Budget</h2>
            <p className="text-xl font-medium mb-4">
              ${job.minPrice} - ${job.maxPrice}
            </p>
            {job.wallet.address !== address && (
              <CreateProposal
                jobId={job.id}
                clientAddress={job.wallet.address}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
