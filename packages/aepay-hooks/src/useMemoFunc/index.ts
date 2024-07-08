/*
 * @Author: majiahui
 * @Description: 
 * @Date: 2024-02-04 10:58:45
 * @LastEditTime: 2024-05-14 16:15:46
 * @FilePath: /aepay-pkg/packages/aepay-hooks/src/useMemoFunc/index.ts
 */

import { useCallback, useRef } from 'react';

export function useMemoFunc<T, I>(func: (...v: I extends any[] ? I : [I]) => T, memoDeps: any[] = []) {
  const rememberMap = useRef(new Map());
  const depsKey = JSON.stringify(memoDeps);
  if (!rememberMap.current.get(depsKey + '-memoDeps')) {
    rememberMap.current.clear();
    rememberMap.current.set(depsKey + '-memoDeps', memoDeps);
  }
  return useCallback(function returnFun(...deps: I extends any[] ? I : [I]): T {
    const key = JSON.stringify(deps);
    if (rememberMap.current.has(key)) {
      return rememberMap.current.get(key);
    }
    const returnValue = func(...deps);
    rememberMap.current.set(key, returnValue);
    return returnValue;
  }, memoDeps || []);
}