import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { useSession } from '../session/useSession';

export const useWebsocket = <T,>() => {
  const { token } = useSession();

  const {
    lastJsonMessage: lastMessage,
    readyState,
    sendJsonMessage: sendMessage,
  } = useWebSocket<T>(process.env.NEXT_PUBLIC_WSS_URL!, {
    protocols: ['Authorization', token],
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    retryOnError: true,
    shouldReconnect: (closeEvent) => {
      if (closeEvent.code === 1000) {
        return false;
      }
      return true;
    },
    share: true,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    console.info('[WS Status]:', connectionStatus);
  }, [connectionStatus]);

  return {
    lastMessage,
    readyState,
    sendMessage,
  };
};