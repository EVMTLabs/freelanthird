import { useEffect, useState } from 'react';

export const useWindowVisibility = () => {
  const [isActiveTab, setIsActiveTab] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActiveTab(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { isActiveTab };
};
