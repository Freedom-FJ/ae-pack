/*
 * @Author: mjh
 * @Date: 2024-04-07 15:34:28
 * @LastEditors: mjh
 * @LastEditTime: 2024-05-15 14:35:40
 * @Description:
 */
export const classExpr = 'aep-';

export const classExprRaw = (name: TemplateStringsArray, ...rest: string[]) => {
  const list = name.join('').split(/\s+/).concat(rest).filter(Boolean);
  return list.reduce((acc: string, cur: string) => `${acc ? `${acc} ` : ''}${classExpr}${cur}`, '');
};