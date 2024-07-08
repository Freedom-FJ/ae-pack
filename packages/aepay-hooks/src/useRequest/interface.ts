export type Service<TData, TParams extends any[]> = (
  ...args: TParams
) => Promise<TData | { data: TData }>;

export type Subscribe = () => void;

export interface FetchState<TData, TParams extends any[]> {
  loading: boolean;
  params?: TParams;
  data?: TData;
  error?: Error;
}

export interface Options<TData, TParams extends any[]> {
  manual?: boolean;
  defaultParams?: any[];
  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  formatResult?: (res: any) => TData;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  handleError?: (err: any) => { errorMsg: string } | null;
  showError?: boolean;
  autoRetry?: ((value: TData) => boolean) | boolean;
  retryInterval?: number;
  retryCount?: number | ((retryInterval?: number) => number);
  url?: string; // mtop地址，用于生成cacheKey
  cache?: boolean;
  cacheTime?: number;
}

export interface PluginReturn<TData, TParams extends any[]> {
  onBefore?: (params?: TParams) =>
    | ({
        stopNow?: boolean;
        returnNow?: boolean;
      } & Partial<FetchState<TData, TParams>>)
    | any;

  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams
  ) => {
    servicePromise?: Promise<TData>;
  };

  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  onCancel?: () => void;
  onMutate?: (data: TData) => void;
}

export type Plugin<TData, TParams extends any[]> = {
  (fetchInstance: any, options: Options<TData, TParams>): PluginReturn<TData, TParams>;
  onInit?: (options: Options<TData, TParams>) => Partial<FetchState<TData, TParams>>;
};

export type Timeout = ReturnType<typeof setTimeout>;
