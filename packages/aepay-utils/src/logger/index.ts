import type { Params, etKey } from '../interface';

const colorMap = {
  debug: 'background-color: red; color:#fff; border-radius: 4px; padding: 2px 4px;',
  info: 'background-color: green; color:#fff; border-radius: 4px; padding: 2px 4px;',
  error: 'background-color: red; color:#fff; border-radius: 4px; padding: 2px 4px;',
};

const showLogger = true;

export function Logger(prefixName: string = 'Logger') {
  return {
    debug: (...params: any[]) => {
      if (showLogger) {
        console.log(`%c [${prefixName}]...`, colorMap.debug, ...params);
      }
    },
    info: (...params: any[]) => {
      if (showLogger) {
        console.log(`%c [${prefixName}]...`, colorMap.info, ...params);
      }
    },
    error: (...params: any[]) => {
      if (showLogger) {
        console.error(`%c [${prefixName}]...`, colorMap.error, ...params);
      }
    },
  };
}

const log = Logger('MakeLogger');
const prefixLogger = 'aepay';

export function makeLogger(eventId: string, et: etKey, params?: Params) {
  try {
    const eventName = `${prefixLogger}-${eventId}`;
    const { pathname, hash } = window.location;
    const loggerOption = {
      et,
      c6: `${pathname}__${
        hash.indexOf('?') <= -1 ? hash.slice(1) : hash.slice(1, hash.indexOf('?'))
      }`,
      ...params,
    };
    log.info(eventName, loggerOption);

    if ((window as any).sendAESEvent) {
      (window as any).sendAESEvent(eventName, loggerOption);
    } else {
      console.error('未找到sendAESEvent方法');
    }
  } catch (error: any) {
    console.error(error.message);
  }
}

/**
 * 点击事件埋点
 * @param eventId 事件名称
 * @param params 事件参数
 */
export function click(eventId: string, params?: Params) {
  makeLogger(eventId, 'CLK', params);
}

/**
 * 曝光事件埋点
 * @param eventId 事件名称
 * @param params 事件参数
 */
export function expose(eventId: string, params?: Params) {
  makeLogger(eventId, 'EXP', params);
}
