'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseClipboardOptions {
  timeout?: number;
  format?: string;
}

export function useClipboard(
  value: string,
  optionsOrTimeout: number | UseClipboardOptions = {},
) {
  const [hasCopied, setHasCopied] = useState(false);

  const [valueState, setValueState] = useState(value);
  useEffect(() => setValueState(value), [value]);

  const { timeout = 1500, ...copyOptions } =
    typeof optionsOrTimeout === 'number'
      ? { timeout: optionsOrTimeout }
      : optionsOrTimeout;

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(valueState);
      setHasCopied(true);
    } catch (error) {
      console.error('Failed to copy value:', error);
    }
  }, [valueState, copyOptions]);

  useEffect(() => {
    let timeoutId: number | null = null;

    if (hasCopied) {
      timeoutId = window.setTimeout(() => {
        setHasCopied(false);
      }, timeout);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [timeout, hasCopied]);

  return {
    value: valueState,
    setValue: setValueState,
    onCopy,
    hasCopied,
  };
}
