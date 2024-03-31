import { MainLayout } from '@/components/Layouts/MainLayout';
import { NeedHelpContact } from '@/components/NeedHelpContact/NeedHelpContact';

export default function TokenPage() {
  return (
    <MainLayout>
      <h1 className="text-4xl font-medium mt-10 mb-4">Community Token (FLT)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4">
            Freelanthird token (FLT) guarantees a commission-free experience for
            all users. When you transact using FLT, you won&apos;t encounter any
            commission charges. It&apos;s a hassle-free experience designed to
            empower our users.
          </p>
          <p className="text-lg">
            Currently you can aquire FLT by joining our Discord community and
            our private list of early adopters. We will be launching our token
            soon and you will be able to purchase it on the open market.
          </p>
        </div>
        <NeedHelpContact />
      </div>
    </MainLayout>
  );
}
