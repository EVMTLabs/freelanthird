import { Footer } from '../Footer/Footer';

export const MainLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <main className="flex flex-col min-h-[calc(100vh-209px)] max-w-6xl container pt-10 pb-20 mx-auto relative px-6">
        {children}
      </main>
      <Footer />
    </>
  );
};
