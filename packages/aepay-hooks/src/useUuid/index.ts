/*
 * @Author: majiahui
 * @Description: 
 * @Date: 2024-02-04 17:08:34
 * @LastEditTime: 2024-02-04 17:38:34
 * @FilePath: /aepay-pkg/packages/aepay-hooks/src/useUuid/index.ts
 */
import { useState } from 'react';
export function getUuid() {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      const callback = (c: string) => {
        const num = Number(c);
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
      };
      return (`${1e7}` + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, callback);
    }
  }
  let timestamp = new Date().getTime();
  let performNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (performNow + random) % 16 | 0;
      performNow = Math.floor(performNow / 16);
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}
const allUuid:string[] = [];
export const useUuid = (option?: { init?: boolean }) => {
  const { init } = option || {};
  const [uuidList, setUuid] = useState(init ? [getUuid()] : []);

  const add = () => {
    const id = curGetUuid();
    setUuid((pre) => [...pre, id]);
    return id;
  };

  const curGetUuid : () => string = () => {
    const id = getUuid();
    if (allUuid.indexOf(id) !== -1) {
      return curGetUuid();
    }
    allUuid.push(id)
    return id;
  };

  const clear = () => {
    setUuid([]);
  };

  const remove = (index: number) => {
    const removeId = uuidList.splice(index, 1);
    setUuid([...uuidList]);
    return removeId[0];
  };

  const reverse = () => {
    const reverseList = uuidList.reverse()
    setUuid(reverseList);
  };

  return [uuidList, { setUuid, add, clear, remove, getUuid: curGetUuid, reverse }];
};
