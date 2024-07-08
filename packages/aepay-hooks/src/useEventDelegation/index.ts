import { useEffect, useRef, useState } from 'react';


export function useLatest(value: any) {
  var ref = useRef(value);
  ref.current = value;
  return ref;
}

/**
 * @description: 让出主线程方法
 * @event:
 * @param {*} time 延时时间
 * @return {*}
 */
export function sleepToMain(time = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export interface useEventDelegationOption {
  ref: React.MutableRefObject<any> | HTMLElement;
  matches: string;
  event: string;
  time: number;
  addEventListenerOptions: boolean | EventListenerOptions;
}
/**
 * @typedef {Object} Option - 委托配置
 * @property {string} ref - ref或者dom节点，
 * @property {string} matches - 匹配委托事件dom节点。多个节点：,号分割；排除节点：!开头即可
 * @property {string} event - 委托事件类型
 * @property {number} time - 初始化延时时间
 */
/**
 * 事件委托hook
 * @param func 委托事件
 * @param {Option} option 委托配置
 * @return {*}
 */
export const useEventDelegation =  (
  func: (e: Event) => void,
  option: Partial<useEventDelegationOption> = {},
) => {
  const { ref, matches = '', event = 'click', time = 0, addEventListenerOptions } = option;
  const funcRef = useLatest(func); // 解决回调内无法获取最新state问题
  const destroy = useRef<() => void>()
  const [isDestroy, setDestroy] = useState(false);
  useEffect(() => {
    const element = (ref as React.MutableRefObject<any>)?.current ?? (ref as HTMLElement);
    if (!element) return;
    const handleListen = (e: FocusEvent) => {
      const target = e.target as Element;
      if (!target) return;
      if (!matches) return funcRef.current(e);
      const matchesArr = matches.split(',');
      const [match, notMatch] = matchesArr.reduce(
        (pre, cur) => {
          if (cur.startsWith('!')) pre[1].push(cur.slice(1));
          else pre[0].push(cur);
          return pre;
        },
        [[], []] as string[][],
      );
      if (notMatch.some((item) => target.matches(item))) {
        return;
      }
      if (match.some((item) => target.matches(item))) {
        funcRef.current(e);
      }
    };
    (async () => {
      time && (await sleepToMain(time)); // 后面改成 方法名称改成sleep
      element.addEventListener(event, handleListen, addEventListenerOptions);
    })();
    destroy.current = () => {
      setDestroy(true)
      element.removeEventListener(event, handleListen, addEventListenerOptions);
    };
    return destroy.current
  }, []);
  return {
    isDestroy,
    destroy: () => destroy.current?.()
  }
};