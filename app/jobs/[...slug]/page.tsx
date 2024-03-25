import Link from 'next/link';
import { redirect } from 'next/navigation';

import { findJobById } from '@/actions/jobs';
import { DefaultAvatar } from '@/components/Avatars/DefaultAvatar/DefaultAvatar';
import { CreateProposal } from '@/components/CreateProposal/CreateProposal';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { PublishedAt } from '@/components/PublishedAt/PublishedAt';
import { EditorContentView } from '@/components/RichTextEditor/EditorContentView';
import { getServerSession } from '@/session/getServerSession';

import { JobStats } from './components/JobStats';

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
      <div className="grid grid-cols-12 my-10">
        <div className="col-span-9 border-r px-5">
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
        </div>
        <div className="flex flex-col px-8 col-span-3">
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
          <div className="mt-8">
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
