import Link, { type LinkProps } from 'next/link';

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
}

export const CustomLink = ({ children, ...rest }: CustomLinkProps) => {
  return (
    <Link
      className="text-md font-semibold group transition duration-300"
      {...rest}
    >
      {children}
      <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-primary"></span>
    </Link>
  );
};
