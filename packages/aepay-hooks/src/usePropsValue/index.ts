import { useCallback, useReducer, useRef } from 'react';

interface Options<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (v: T, ...rest: any[]) => void;
  transformer?: {
    getValueFormatter: (value: any) => T;
    setValueFormatter: (value: T) => any;
  };
}

const useRefFunction = <T extends (...args: any) => any>(reFunction: T) => {
  const ref = useRef<any>(null);
  ref.current = reFunction;
  return useCallback((...rest: Parameters<T>): ReturnType<T> => {
    return ref.current?.(...(rest as any));
  }, []);
};

export function usePropsValue<T>(options: Options<T>) {
  const { value, defaultValue, onChange, transformer } = options;
  const { getValueFormatter, setValueFormatter } = transformer || {};

  const [_, update] = useReducer(x => x + 1, []);
  const previousValue = useRef(value);

  const stateRef = useRef<T>(value !== undefined ? value : (defaultValue as any));
  if (value !== undefined || (previousValue !== undefined && value === undefined)) {
    stateRef.current = value as T;
  }

  const setState = useRefFunction((nextValue: T, ...rest: any) => {
    stateRef.current = nextValue;
    update();
    onChange?.(setValueFormatter ? setValueFormatter(nextValue) : nextValue, ...rest);
  });

  return [
    getValueFormatter ? getValueFormatter(stateRef.current) : stateRef.current,
    setState
  ] as const;
}