export const MainLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="flex flex-col min-h-screen max-w-6xl container my-10 mx-auto relative">
      {children}
    </main>
  );
};
