import { useEffect, useRef, useState } from 'react';

export interface Options {
  restoreOnUnmount?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
};

export function useTitle(defaultTitle: string = '', options: Options = DEFAULT_OPTIONS) {
  const titleRef = useRef(document.title);
  const [title, setTitle] = useState(defaultTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    document.title = title;

    return () => {
      if (options.restoreOnUnmount) {
        document.title = titleRef.current;
      }
    };
  }, []);

  return { setTitle };
}
