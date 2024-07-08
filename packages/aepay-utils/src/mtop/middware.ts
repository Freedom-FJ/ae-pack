import { RequestParam } from './interface';

export class Middleware<S, E> {
  middlewares: any[] = [];
  private id: number;
  constructor(id: number) {
    this.id = id;
  }

  use(onSuccess: S, onError: E) {
    const id = this.id++;
    this.middlewares.push({ id, onSuccess, onError });
    return id;
  }

  eject(id: number) {
    this.middlewares = this.middlewares.filter((item) => item.id !== id);
  }

  trigger(options: any) {
    for (const middleware of this.middlewares) {
      const { onSuccess, onError } = middleware;
      try {
        const result = onSuccess(options);
        return result;
      } catch (error) {
        return onError(error);
      }
    }

    return options;
  }
}

export const interceptors = {
  request: new Middleware<(config: RequestParam) => RequestParam, (error: Error) => Promise<Error>>(1000),
  response: new Middleware<(response: any) => any, (error: Error) => Promise<Error>>(2000)
}
