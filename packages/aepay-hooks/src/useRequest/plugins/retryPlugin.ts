import type { Timeout, PluginReturn, Options } from '../interface';
import { useRef } from 'react';

function useRetryPlugin<TData, TParams extends any[]>(
  fetchInstance: any,
  options: Options<TData, TParams>
): PluginReturn<TData, TParams> {
  const { autoRetry, retryInterval = 3000, retryCount = 3 } = options || {};
  const timerRef = useRef<Timeout>();
  const countRef = useRef(0);
  const count = typeof retryCount === 'function' ? retryCount(retryInterval) : retryCount;

  const triggerByRetry = useRef(false);

  if (!count) {
    return {};
  }

  const isAutoRetry = (res?: any): boolean => {
    if (typeof autoRetry === 'boolean') {
      return autoRetry;
    } else if (typeof autoRetry === 'function') {
      return autoRetry(res?.data || res);
    }

    return false;
  };

  const onRetry = () => {
    countRef.current += 1;
    if (count === -1 || countRef.current < count) {
      const timeout = retryInterval ?? Math.min(1000 * 2 ** countRef.current, 30000);
      timerRef.current = setTimeout(() => {
        triggerByRetry.current = true;
        fetchInstance.refresh();
      }, timeout);
    } else {
      countRef.current = 0;
    }
  };

  return {
    onBefore: () => {
      if (!triggerByRetry.current) {
        countRef.current = 0;
      }
      triggerByRetry.current = false;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    onSuccess: (res) => {
      if (isAutoRetry(res)) {
        onRetry();
      }
    },
    onError: () => {
      if (isAutoRetry()) {
        onRetry();
      }
    },
    onCancel: () => {
      countRef.current = 0;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
  };
}

export default useRetryPlugin;
