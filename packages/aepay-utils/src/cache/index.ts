export type Timeout = ReturnType<typeof setTimeout>;

export interface CachedData<TData = any> {
  data: TData;
  timer?: Timeout;
}

export class Cache<T = any> {
  cache = new Map<string, CachedData<T>>();

  set(key: string, value: any, cacheTime: number) {
    const currentCache = this.cache.get(key);
    if (currentCache?.timer) {
      clearTimeout(currentCache.timer);
    }

    let timer: Timeout | undefined;

    if (cacheTime > -1) {
      // if cache out, clear it
      timer = setTimeout(() => {
        this.delete(key);
      }, cacheTime);
    }

    this.cache.set(key, {
      data: value,
      timer,
    });
  }

  has(key: string) {
    return this.cache.has(key);
  }

  get(key: string): T | undefined {
    if (!this.has(key)) {
      return undefined;
    }

    return this.cache.get(key)?.data;
  }

  delete(key: string) {
    if (this.has(key)) {
      const currentCache = this.cache.get(key);
      if (currentCache?.timer) {
        clearTimeout(currentCache.timer);
      }
      this.cache.delete(key);
    }
  }

  clear(key?: string | string[]) {
    if (key) {
      const cacheKeys = Array.isArray(key) ? key : [key];
      cacheKeys.forEach((cacheKey) => this.delete(cacheKey));
    } else {
      this.cache.clear();
    }
  }
}

export const cacheApi = new Cache();
