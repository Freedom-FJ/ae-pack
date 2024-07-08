import { useRequest } from '../useRequest';
import { Options } from '../useRequest/interface';
import $i18n from '../useRequest/locale';
import { mtop, logger, RequestParam } from '@ali/aepay-utils';

export interface MtopResp {
  data: any;
  ret: string[];
  code?: string;
  success?: boolean;
  message?: string;
  errMessage?: string;
  msg?: string;
}

export type IMtopParams<T> = T extends any[] ? T : [T];

export interface IMtopOptions<TData, TParams> extends Options<TData, IMtopParams<TParams>> {
  mtopParams?: Partial<RequestParam>;
  ignoreInterceptors?: boolean;
}

// 错误信息映射
const errMap: any = {
  SYSTEM_ERROR: $i18n['aepay.base.system.error'],
};

// 处理mtop错误
export function getMtopError(mtopError: MtopResp) {
  try {
    if (mtopError.code) {
      return {
        errorCode: mtopError.code,
        errorMsg:
          errMap[mtopError.code] || mtopError.message || mtopError.errMessage || mtopError.msg || mtopError.code,
      };
    }

    const ret = mtopError?.ret;
    if (Array.isArray(ret)) {
      const errorStr = ret[0];
      if (errorStr && errorStr.indexOf('::') !== -1) {
        const errorFields = errorStr.split('::');
        return {
          errorCode: errorFields[0],
          errorMsg: errorFields[1],
        };
      }
    }
  } catch (error) {
    return null;
  }
  return null;
}

// 控制台日志
const log = logger.Logger("USE MTOP");

export function useMtop<TData, TParams extends any = any[]>(url: string, options?: IMtopOptions<TData, TParams>) {
  const fetcher = async (...params: any[]) => {
    const data = params.length <= 1 ? params[0] || {} : params;
    log.debug(url, data);

    try {
      const response = await mtop({
        url,
        method: 'GET',
        data,
        ignoreInterceptors: options?.ignoreInterceptors,
        ...options?.mtopParams,
      });

      return response;
    } catch (err: any) {
      log.error('接口异常>>>', url, err);
      if (err?.ret && Array.isArray(err.ret)) {
        throw err;
      }

      throw err?.data || err;
    }
  };

  return useRequest<TData, IMtopParams<TParams>>(fetcher, {
    showError: true,
    ...options,
    handleError: getMtopError,
    formatResult: (res) => {
      const d = res?.data || res;
      if (options?.formatResult) {
        return options.formatResult(d);
      }

      return d;
    },
    url,
  });
}
