import { MainLayout } from '@/components/Layouts/MainLayout';
import { NeedHelpContact } from '@/components/NeedHelpContact/NeedHelpContact';

export default function SecurityPage() {
  return (
    <MainLayout>
      <h1 className="text-4xl font-medium mt-10 mb-4">Security</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-medium mt-4 mb-2">Overview</h2>
          <p className="text-lg mb-4 pb-8 border-b">
            At freelanthird, we take security seriously and are dedicated to
            continuously improving our platform to ensure your protection.
            We&apos;re committed to maintaining a secure environment for all
            users. We welcome the community to review our smart contract code
            and report any security issues they find.
          </p>
          <h2 className="text-2xl font-medium mt-8 mb-2">
            Report a Vulnerability
          </h2>
          <p className="text-lg">
            If you believe you have found a security vulnerability on our
            platform, please report it to us immediately. We will investigate
            all legitimate reports and take the necessary steps to address the
            issue. You can report a vulnerability by contacting us on{' '}
            <a
              target="_blank"
              className="font-bold"
              href="https://discord.gg/fQageBbAA4"
              rel="noopener noreferrer"
            >
              Discord
            </a>{' '}
            or sending an email to{' '}
            <a
              target="_blank"
              className="font-bold"
              href="mailto:security@freelanthird.com"
              rel="noopener noreferrer"
            >
              security@freelanthird.com
            </a>{' '}
          </p>
        </div>
        <NeedHelpContact />
      </div>
    </MainLayout>
  );
}
