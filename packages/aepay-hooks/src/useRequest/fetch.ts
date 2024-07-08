import type { FetchState, PluginReturn, Service, Options, Subscribe } from './interface';
import type { MutableRefObject } from 'react';
import $i18n from './locale';

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[] = [];

  count: number = 0;

  state: FetchState<TData, TParams> = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  };

  constructor(
    public serviceRef: MutableRefObject<Service<TData, TParams>>,
    public options: Options<TData, TParams>,
    public subscribe: Subscribe,
    public initState: Partial<FetchState<TData, TParams>> = {}
  ) {
    this.state = {
      ...this.state,
      loading: !options.manual,
      ...initState,
    };
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    this.state = {
      ...this.state,
      ...s,
    };
    this.subscribe();
  }

  runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }

  handleData(res: any): TData {
    const formatResult = this.options.formatResult;
    if (typeof formatResult === 'function') {
      return formatResult(res);
    } else {
      return res;
    }
  }

  async runAsync(...params: TParams): Promise<TData> {
    this.count += 1;
    const currentCount = this.count;

    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler('onBefore', params);

    // stop request
    if (stopNow) {
      return new Promise(() => {});
    }

    this.setState({
      loading: true,
      params,
      ...state,
    });

    // return now
    if (returnNow) {
      this.options.onSuccess?.(state.data, params);
      this.options.onFinally?.(params, state.data, undefined);

      this.setState({
        data: this.handleData(state.data),
      });
      return Promise.resolve(state.data);
    }

    this.options.onBefore?.(params);

    try {
      // replace service
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.current, params);

      if (!servicePromise) {
        servicePromise = this.serviceRef.current(...params);
      }

      const res = await servicePromise;

      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {});
      }

      this.setState({
        data: this.handleData(res),
        error: undefined,
        loading: false,
      });

      this.options.onSuccess?.(res, params);
      this.runPluginHandler('onSuccess', res, params);

      this.options.onFinally?.(params, res, undefined);

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, res, undefined);
      }

      return res;
    } catch (error: any) {
      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {});
      }

      const { errorMsg } = this.options.handleError?.(error) || {
        errorMsg: error?.message || error?.code,
      };
      this.setState({
        error: errorMsg || error,
        loading: false,
      });

      if (this.options.showError) {
        (window as any).Next?.Message.error(errorMsg || $i18n['aepay.base.system.error']);
      }

      this.options.onError?.(error, params);
      this.runPluginHandler('onError', error, params);

      this.options.onFinally?.(params, undefined, error);

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, undefined, error);
      }

      throw error;
    }
  }

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError) {
        console.error(error);
      }
    });
  }

  cancel() {
    this.count += 1;
    this.setState({
      loading: false,
    });

    this.runPluginHandler('onCancel');
  }

  refresh() {
    this.run(...((this.state.params || []) as TParams));
  }

  refreshAsync() {
    return this.runAsync(...((this.state.params || []) as TParams));
  }

  mutate(data?: ((oldData?: TData) => TData | undefined) | TData) {
    // @ts-ignore
    const targetData = typeof data === 'function' ? data(this.state.data) : data;
    this.runPluginHandler('onMutate', targetData);
    this.setState({
      data: targetData,
    });
  }
}
