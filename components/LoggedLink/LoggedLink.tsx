'use client';

import { useModal } from 'connectkit';
import type { LinkProps } from 'next/link';
import Link from 'next/link';

import { useSession } from '@/hooks/session/useSession';

interface LoggedLinkProps extends LinkProps {
  text: string;
  className?: string;
}

export const LoggedLink = ({ text, ...rest }: LoggedLinkProps) => {
  const { session } = useSession();
  const { setOpen } = useModal();

  const openConnectModal = () => {
    setOpen(true);
  };

  const buttonProps = {
    className: rest.className,
    onClick: openConnectModal,
  };

  return session?.isLoggedIn ? (
    <Link {...rest}>{text}</Link>
  ) : (
    <button {...buttonProps}>{text}</button>
  );
};
