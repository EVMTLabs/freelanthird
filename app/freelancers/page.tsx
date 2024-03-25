import type { Metadata } from 'next';

import { findFreelancers } from '@/actions/freelancers';
import { findJobCategories } from '@/actions/jobs';
import { MainLayout } from '@/components/Layouts/MainLayout';

import { FreelancerCategories } from './components/FreelancerCategories';
import { FreelancerList } from './components/FreelancerList';

export const metadata: Metadata = {
  title: 'Freelancers',
};

export default async function FreelancersPage() {
  const freelancers = await findFreelancers();
  const categories = await findJobCategories();

  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-6 my-20">
        <div className="col-span-3">
          <div className="flex flex-col border-r">
            <h2 className="text-xl">Specialities</h2>
            <FreelancerCategories categories={categories} />
          </div>
        </div>
        <div className="col-span-9">
          <FreelancerList freelancers={freelancers} />
        </div>
      </div>
    </MainLayout>
  );
}
