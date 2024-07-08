/*
 * @Author: majiahui
 * @Description: 
 * @Date: 2024-02-04 17:08:34
 * @LastEditTime: 2024-05-20 15:35:28
 * @FilePath: /aepay-pkg/packages/aepay-hooks/src/useUuid/index.ts
 */
import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

export const useEffectOnce = (effect: EffectCallback, deps: DependencyList, checkFun: (() => boolean) | boolean) => {
  const isOnce = useRef(false);
  useEffect(() => {
    if (isOnce.current || !(typeof checkFun === 'function' ? checkFun() : checkFun)) return;
    isOnce.current = true;
    const returnEffect = effect();
    return returnEffect;
  }, deps);
};