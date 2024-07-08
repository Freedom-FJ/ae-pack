import { useMemo, useState } from 'react';

export const useEventLoading = function (
  loading?: boolean,
  autoLoading?: boolean,
  func?: (...args: any) => void | Promise<void>,
  afterFunc?: () => void,
  onLog?: () => void
) {
  const [selfLoading, setSelfLoading] = useState(false);
  const res_loading = useMemo(() => {
    if (autoLoading !== true) {
      return loading;
    } else {
      return selfLoading;
    }
  }, [loading, autoLoading, selfLoading]);

  const onClick = (...arg: any) => {
    onLog && onLog();
    const res = func && func(...arg);
    if (res && res.then) {
      setSelfLoading(true);
      res.then().finally(() => {
        setSelfLoading(false);
        afterFunc && afterFunc();
      });
    } else {
      afterFunc && afterFunc();
    }
  };

  return { loading: res_loading, onClick };
};
