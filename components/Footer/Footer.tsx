import Link from 'next/link';

import { DiscordIcon } from '../SocialIcons/DiscordIcon';
import { GithubIcon } from '../SocialIcons/GithubIcons';
import { TwitterIcon } from '../SocialIcons/TwitterIcon';

export const Footer = () => {
  const links = [
    { name: 'Token', href: '/flt-token' },
    { name: 'FAQ', href: '/faq' },
    // { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Security', href: '/security' },
  ];

  return (
    <footer className="flex flex-col w-full md:justify-between md:items-center p-10 md:flex-row">
      <div className="mb-8 md:mb-0">
        <div className="flex flex-col gap-4 justify-center md:flex-row md:justify-start">
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
        <p className="text-xs mt-5 w-52 md:w-full">
          Media inquires for Freelanthird.com - Contact{' '}
          <a
            href="mailto:info@freelanthird.com"
            rel="noopener noreferrer"
            target="_blank"
            className="font-bold"
          >
            info@freelanthird.com
          </a>
        </p>
      </div>
      <div className="flex space-x-1 w-full items-center justify-center md:w-fit">
        <a
          className="btn btn-link text-neutral hover:text-primary"
          href="https://discord.gg/fQageBbAA4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscordIcon />
        </a>
        <a
          className="btn btn-link text-neutral hover:text-primary"
          href="https://x.com/freelanthird"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </a>
        <a
          className="btn btn-link text-neutral hover:text-primary"
          href="https://github.com/freelanthird"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
};
