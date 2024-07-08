export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT';

type Headers = Record<string, string | string[] | number | boolean>;
type MethodsHeaders = {
  [Key in Method as Lowercase<Key>]: Headers;
};

interface CommonHeaders {
  common: Headers;
}

export type RequestHeaders = Partial<Headers & MethodsHeaders & CommonHeaders>;

export interface RequestParam<D = any> {
  url: string;
  method?: Method;
  headers?: RequestHeaders;
  params?: any;
  data?: D;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: ResponseType;
  H5Request?: boolean; // 针对 mtop 的参数
  mtopConfig?: MtopConfig; // mtop配置
  ignoreInterceptors?: boolean; // 是否忽略拦截器
  userOptions?: Record<string, any>; // 用户自定义
}

export interface MtopOptions {
  /**
   * api 名称
   */
  api: string;
  /**
   * 版本号
   */
  v: string;
  /**
   * Mtop平台要求data的key对应的value必须是基本类型，如果数据结构上不是基本类型（Object/Array），需要序列化成JSONString
   */
  data: {
    [key: string]: string | number | boolean | null | undefined;
  };
  appKey?: string;
  /**
   * 需登录的接口为1，其余为0
   */
  ecode?: 0 | 1;
  /**
   * 请求类型（GET/POST），默认是GET
   */
  type?: 'GET' | 'POST';
  /**
   * 数据类型（jsonp/originaljsonp/json），默认jsonp
   */
  dataType?: 'jsonp' | 'originaljsonp' | 'json';
  /**
   * 接口超时设置，默认为20000ms
   */
  timeout?: number;
  /**
   * 是否为H5请求
   */
  H5Request?: boolean;
}

export interface MtopConfig {
  prefix?: string;
  subDomain?: string;
  mainDomain?: string;
  [key: string]: any;
}