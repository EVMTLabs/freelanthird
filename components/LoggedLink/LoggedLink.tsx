'use client';

import { useModal } from 'connectkit';
import type { LinkProps } from 'next/link';
import Link from 'next/link';

import { useSession } from '@/context/SessionContext';

interface LoggedLinkProps extends LinkProps {
  text: string;
  className?: string;
}

export const LoggedLink = ({ text, ...rest }: LoggedLinkProps) => {
  const { isLoggedIn } = useSession();
  const { setOpen } = useModal();

  const openConnectModal = () => {
    setOpen(true);
  };

  const buttonProps = {
    className: rest.className,
    onClick: openConnectModal,
  };

  console.log(isLoggedIn);

  return isLoggedIn ? (
    <Link {...rest}>{text}</Link>
  ) : (
    <button {...buttonProps}>{text}</button>
  );
};
