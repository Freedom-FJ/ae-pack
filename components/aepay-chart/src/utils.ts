export const classExpr = 'aep-chart-';

export type IEnumItem = { label: string; value: string };

export const classExprRaw = (name: TemplateStringsArray, ...rest: string[]) => {
  const list = name.join('').split(/\s+/).concat(rest).filter(Boolean);
  return list.reduce((acc: string, cur: string) => `${acc ? `${acc} ` : ''}${classExpr}${cur}`, '');
};

export function transformSeriesData(data: any[], legends: IEnumItem[], legendKey: string = 'type', yAxis = 'value') {
  return data.reduce((acc, cur) => {
    legends.forEach((leg) => {
      acc.push({
        ...cur,
        [legendKey]: leg.value,
        [yAxis]: cur[leg.value],
      });
    });

    return acc;
  }, []);
}
