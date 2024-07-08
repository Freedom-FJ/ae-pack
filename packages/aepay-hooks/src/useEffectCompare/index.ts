/*
 * @Author: majiahui
 * @Description: 
 * @Date: 2024-02-04 17:08:34
 * @LastEditTime: 2024-05-22 13:37:38
 * @FilePath: /aepay-pkg/packages/aepay-hooks/src/useUuid/index.ts
 */
import { useEffect, useRef, DependencyList } from 'react';

export function useEffectCompare<T extends DependencyList> (effect: (oldDeps?: T) => any, deps: T){
  const oldDeps = useRef<T>();
  useEffect(() => {
    const returnEffect = effect(oldDeps.current);
    oldDeps.current = deps;
    return returnEffect;
  }, deps);
};