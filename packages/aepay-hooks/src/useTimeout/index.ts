import { useCallback, useEffect, useMemo, useRef } from 'react';

export const useTimeout = (fn: () => void, delay?: number) => {
  const delayRef = useRef(delay);

  const fnRef = useRef(fn);
  fnRef.current = useMemo(() => fn, [fn]);

  const timerCallback = useRef<any>();
  if (!timerCallback.current) {
    timerCallback.current = function (this, ...args: any) {
      console.log('timeout end...', Date.now());
      clear();
      return fnRef.current.apply(this, args);
    };
  }

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const isInValidTime = (time: any) => {
    return typeof time !== 'number' || time < 0 || Number.isNaN(time);
  }

  const reset = useCallback(() => {
    if (isInValidTime(delayRef.current)) {
      return;
    }

    console.log('timeout start...', Date.now(), delayRef.current);
    clear();
    timerRef.current = setTimeout(timerCallback.current, delayRef.current);
  }, [delay]);

  useEffect(() => {
    delayRef.current = delay;

    reset();
    return clear;
  }, [delay]);

  return {
    clear,
    resetTime: reset
  };
};

