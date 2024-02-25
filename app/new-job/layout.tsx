import { JobFormProvider } from "./context/CreateJobContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <JobFormProvider>{children}</JobFormProvider>;
}
