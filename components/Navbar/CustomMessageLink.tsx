'use client';

import { CustomLink } from '../CustomLink/CustomLink';

export const CustomMessageLink = () => {
  return (
    <CustomLink href="/messages">
      <span className="indicator">
        Messages
        <span className="badge badge-xs badge-primary indicator-item right-[-10px] top-1" />
      </span>
    </CustomLink>
  );
};
