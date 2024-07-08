import type { PluginReturn, Options } from '../interface';
import { Cache } from '@ali/aepay-utils';

const cacheApi = new Cache<{ data: any; params: any; }>();

function useCachePlugin<TData, TParams extends any[]>(
  fetchInstance: any,
  options: Options<TData, TParams>
): PluginReturn<TData, TParams> {
  const { cache = false, cacheTime = 5 * 60 * 1000 } = options;

  const getCacheKey = (params?: any[]) => {
    const url = options.url || '';
    if (!params || !params.length) {
      return url;
    }

    const option = params[0];

    if (typeof option === 'string' || typeof option === 'number') {
      return `${url}_${option}`;
    }

    return Object.keys(option).reduce((res, cur) => {
      res += `_${cur}_${option[cur]}`;
      return res;
    }, url);
  };

  const setCache = (params: any, data: any) => {
    if (cache && options.url) {
      const cacheKey = getCacheKey(params);
      cacheApi.set(cacheKey, { data,  params }, cacheTime);

      // console.log('useCachePlugin onSuccess.....', cacheKey, data, params);
    }
  };

  return {
    onBefore: (params) => {
      if (cache && options.url) {
        const cacheKey = getCacheKey(params);
        const cacheData = cacheApi.get(cacheKey);

        if (!cacheData || !Object.hasOwnProperty.call(cacheData, 'data')) {
          return {};
        }

        return {
          loading: false,
          data: cacheData.data,
          error: undefined,
          returnNow: true,
        };
      } else {
        return {};
      }
    },
    onSuccess: (data, params) => {
      setCache(params, data);
    },
    onMutate: (data: any) => {
      setCache(fetchInstance.state.params, data);
      fetchInstance.setState({ data: data?.data || data });
    },
  };
}

export default useCachePlugin;
