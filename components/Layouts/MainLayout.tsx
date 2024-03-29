import { Footer } from '../Footer/Footer';

export const MainLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <main className="flex flex-col min-h-[calc(100vh-236px)] max-w-6xl container pt-5 pb-20 mx-auto relative px-8 lg:px-6 lg:pt-10">
        {children}
      </main>
      <Footer />
    </>
  );
};
