import Link from 'next/link';

import { DiscordIcon } from '../SocialIcons/DiscordIcon';
import { GithubIcon } from '../SocialIcons/GithubIcons';
import { TwitterIcon } from '../SocialIcons/TwitterIcon';

export const Footer = () => {
  const links = [
    { name: 'Token', href: '/token' },
    { name: 'Help', href: '/help' },
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Security', href: '/security' },
  ];

  return (
    <footer className="flex flex-col w-full justify-between items-center p-10 lg:flex-row">
      <div className="mb-8 lg:mb-0">
        <div className="flex space-x-4 justify-center lg:justify-start">
          {links.map(({ name, href }) => (
            <Link
              className="text-gray-500 hover:text-gray-900"
              key={name}
              href={href}
            >
              {name}
            </Link>
          ))}
        </div>
        <p className="text-xs mt-2">
          Media inquires for Freelanthird.com - Contact{' '}
          <Link
            href="mailto:info@freelanthird.com"
            rel="noopener noreferrer"
            target="_blank"
            className="font-bold"
          >
            info@freelanthird.com
          </Link>
        </p>
      </div>
      <div className="flex space-x-1">
        <Link
          className="btn btn-link text-neutral hover:text-primary"
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscordIcon />
        </Link>
        <Link
          className="btn btn-link text-neutral hover:text-primary"
          href="https://x.com/freelanthird"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </Link>
        <Link
          className="btn btn-link text-neutral hover:text-primary"
          href="https://github.com/freelanthird"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </Link>
      </div>
    </footer>
  );
};
