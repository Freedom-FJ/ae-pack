export const classExpr = 'aep-ekyc-';

export const classExprRaw = (name: TemplateStringsArray, ...rest: string[]) => {
  const list = name.join('').split(/\s+/).concat(rest).filter(Boolean);
  return list.reduce((acc: string, cur: string) => `${acc ? `${acc} ` : ''}${classExpr}${cur}`, '');
};