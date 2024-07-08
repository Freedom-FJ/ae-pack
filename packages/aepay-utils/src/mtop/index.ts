import { MtopConfig, MtopOptions, RequestParam } from './interface';
import { interceptors } from './middware';
import { isCspOrGspPage, getSearchParamByUrl } from '../url';

// 去除空值和stringify对象和数组
const getParamStr = (data: Record<string, any>, paramStringify = true) => {
  return Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((obj, [key, value]) => {
      if (value instanceof Object && paramStringify) {
        value = JSON.stringify(value);
      }
      return { ...obj, [key]: value };
    }, {} as Record<string, any>);
};

// 设置默认值，兼容csp、gsp渠道问题
const getDefaultUserOption = () => {
  if (isCspOrGspPage()) {
    const { channelId } = getSearchParamByUrl();

    if (channelId) {
      return {
        '__channel-id__': channelId,
      };
    }
  }
}

// 转化参数
const transformOptions = (param: RequestParam) => {
  const defaultConfig: MtopConfig = (window as any).mtopConfig || {};
  const headers = {
    ...(defaultConfig.headers || {}),
    ...param.headers,
  };
  if (param.data) {
    param.data = getParamStr(param.data);
  }

  let defaultOptions: Partial<MtopOptions> = {
    ...getDefaultUserOption(),
    ...(param.userOptions || {}),
    v: '1.0',
    appKey: defaultConfig.appKey || '0',
    timeout: param.timeout || 30 * 1000,
    H5Request: true, // 默认为 true 减少容器和浏览器的差异
    ecode: undefined,
    /**
     * 保留x-i18n-regionID、__channel-id__
     * 适配GSP、CSP多渠道场景：https://aliyuque.antfin.com/lsbr7c/hnhznw/if5zpqtwtexk96p7?singleDoc#
    */
    ...(defaultConfig.queryStringParameters || {})
  };

  const { H5Request } = param;
  if (H5Request === false) {
    // 手动声明为false的我们处理成 undefined 不然mtop底层库识别上会有问题
    delete defaultOptions.H5Request;
    // 默认为0 和mtop底层库逻辑保持一致
    defaultOptions.ecode = 0;
  }

  return {
    ...defaultOptions,
    api: param.url,
    headers,
    type: param.method || 'GET',
    dataType: param.responseType || 'json',
    valueType: 'original',
    data: {
      ...(param.data || {})
    },
  };
};

function setConfig(mtopLib: any, config?: MtopConfig) {
  const defaultConfig: MtopConfig = (window as any).mtopConfig;
  if (mtopLib && (config || defaultConfig)) {
    const mtopConfig: MtopConfig = {
      ...(defaultConfig || {}),
      ...(config || {}),
    };

    mtopLib.config.prefix = mtopConfig.prefix;
    mtopLib.config.subDomain = mtopConfig.subDomain;
    mtopLib.config.mainDomain = mtopConfig.mainDomain;
    if (mtopConfig.pageDomain) {
      mtopLib.config.pageDomain = mtopConfig.pageDomain;
    }
  }
}

export async function mtop(reqParams: RequestParam) {
  let mtopLib = (window as any).lib?.mtop;
  if (!mtopLib) {
    // 如果 window 中未注册 lib-mtop，兜底策略
    mtopLib = (await import('@ali/lib-mtop')).default;
  }

  const ignoreInterceptors = reqParams.ignoreInterceptors;
  let params = reqParams;
  if (!ignoreInterceptors) {
    try {
      const delParams = await interceptors.request.trigger({ ...reqParams });
      if (delParams) {
        params = delParams;
      }
    } catch (error) {
      console.log('mtop request interceptor error.....', error);
    }
  }

  setConfig(mtopLib, params?.mtopConfig);
  const options = transformOptions(params);
  const response = await mtopLib.request(options);

  return ignoreInterceptors ? response : interceptors.response.trigger(response);
}

export {
  RequestParam,
  MtopConfig
};

mtop.interceptors = interceptors;