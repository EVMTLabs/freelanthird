import { MainLayout } from '@/components/Layouts/MainLayout';
import { NeedHelpContact } from '@/components/NeedHelpContact/NeedHelpContact';

export default function FAQPage() {
  return (
    <MainLayout>
      <h1 className="text-4xl font-medium mt-10 mb-4">
        Frequently Asked Questions
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
        <div>
          <div className="flex flex-col border-b pb-10">
            <h2 className="text-2xl font-medium mb-2">What is Freelanthird?</h2>
            <p className="text-lg">
              Freelanthird is a decentralized platform that connects freelancers
              with clients. We use blockchain technology to ensure secure and
              transparent transactions.
            </p>
            <h2 className="text-2xl font-medium mt-8 mb-2">
              Is freelanthird truly commission-free?
            </h2>
            <p className="text-lg mb-4">
              Absolutely. When you transact using our exclusive token, FLT, you
              won&apos;t encounter any commission charges. It&apos;s a
              hassle-free experience designed to empower our users.
            </p>
            <p className="text-lg mb-4">
              For transactions made with other currencies, there is a nominal 3%
              fee. This strategic approach is designed to incentivize the
              adoption of our token while simultaneously enhancing its value.
            </p>
            <p className="text-lg">
              At freelanthird, fairness and transparency are at the core of
              everything we do. Whether you opt for FLT or another currency, you
              can trust that our platform is dedicated to providing a seamless
              and equitable experience for all.
            </p>
          </div>
          <div className="flex flex-col border-b pb-10">
            <h2 className="text-2xl font-medium mt-8 mb-2">
              How do I hire a freelancer?
            </h2>
            <p className="text-lg">
              As a client, you can post a job and set a budget for free.
              Freelancers can then send you proposals for the job. After you
              choose a proposal you will have to deposit the budget in escrow.
              Once the job is completed and approved, the funds will be released
              to the freelancer.
            </p>
            <h2 className="text-2xl font-medium mt-8 mb-2">
              How do I become a freelancer?
            </h2>
            <p className="text-lg">
              As a freelancer, you can create a profile and start sending
              proposals to clients. You can set your own rates and work on jobs
              that match your skills and experience.
            </p>
          </div>
          <div className="flex flex-col border-b pb-10">
            <h2 className="text-2xl font-medium mt-8 mb-2">
              Wich payment methods are supported?
            </h2>
            <p className="text-lg">
              Freelanthird supports payments in cryptocurrency. Our smart
              contract will handle the payment process and ensure that both
              parties are satisfied with the job.
            </p>
            <h2 className="text-2xl font-medium mt-8 mb-2">
              Can I pay with USDT or USDC?
            </h2>
            <p className="text-lg">
              For commision free payments, you can pay using our custom token
              FLT or you can pay using USDT or USDC with a 3% fee.
            </p>
          </div>
          <div className="flex flex-col pb-10">
            <h2 className="text-2xl font-medium mt-8 mb-2">
              How do you ensure that the job is completed successfully?
            </h2>
            <p className="text-lg">
              We use a smart contract to ensure that the job is completed
              successfully. The funds are held in escrow until the job is
              completed and approved by the client.
            </p>
            <h2 className="text-2xl font-medium mt-8 mb-2">
              How do I open a dispute?
            </h2>
            <p className="text-lg mb-2">
              If you find yourself unsatisfied with a job, simply navigate to
              the proposal page associated with the project in question. There,
              you&apos;ll have the option to initiate a dispute.
            </p>
            <p className="text-lg mb-2">
              Once initiated, our team will meticulously review the job and
              reach a fair decision. To streamline this process, please contact
              us via Discord, providing the dispute ID for reference. Our
              Discord support team will promptly attend to your case, ensuring a
              swift and equitable resolution in line with our commitment to
              quality service.
            </p>
          </div>
        </div>
        <NeedHelpContact />
      </div>
    </MainLayout>
  );
}
