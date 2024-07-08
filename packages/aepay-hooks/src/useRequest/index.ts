import { Options, Service, Plugin } from './interface';
import Fetch from './fetch';
import useCachePlugin from './plugins/cachePlugin';
import useRetryPlugin from './plugins/retryPlugin';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>
) {
  const { manual = false, defaultParams, ...rest } = options || {};

  const fetchOptions = {
    manual,
    defaultParams,
    ...rest,
  };

  const plugins: Plugin<TData, TParams>[] = [useRetryPlugin, useCachePlugin];
  const serviceRef = useRef(service);
  const [, setState] = useState({});
  const update = useCallback(() => setState({}), []);
  const initState = plugins.map((p) => p?.onInit?.(fetchOptions)).filter(Boolean);

  const reqRef = useRef(new Fetch<TData, TParams>(serviceRef, fetchOptions, update, ...initState));

  const fetchInstance = reqRef.current;

  fetchInstance.options = fetchOptions;
  // run all plugins hooks
  fetchInstance.pluginImpls = plugins.map((p: any) => p(fetchInstance, fetchOptions));

  useEffect(() => {
    if (!manual) {
      const params = (fetchInstance.state.params || defaultParams || []) as TParams;
      fetchInstance.run(...params);
    }

    return () => {
      fetchInstance.cancel();
    };
  }, []);

  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    params: fetchInstance.state.params || [],
    cancel: fetchInstance.cancel.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
    run: fetchInstance.run.bind(fetchInstance),
    runAsync: fetchInstance.runAsync.bind(fetchInstance),
    mutate: fetchInstance.mutate.bind(fetchInstance),
  };
}
