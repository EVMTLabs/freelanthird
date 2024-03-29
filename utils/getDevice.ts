import { headers } from 'next/headers';

export const getDevice = () => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  return userAgent?.match(
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  );
};
