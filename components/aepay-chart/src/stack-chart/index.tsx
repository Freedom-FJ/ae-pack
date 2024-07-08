import React, { useEffect, useMemo, useRef } from 'react';
import { ChartEvent, corelib, extend, Runtime } from '@antv/g2';
import { type IEnumItem, classExprRaw, transformSeriesData } from '../utils';
import './index.scss';

// 按需加载
const Chart = extend(Runtime, corelib());

export interface StackChartProps {
  className?: string;
  style?: React.CSSProperties;
  data: any[];
  width?: number;
  height?: number;
  showZeroLine?: boolean;
  itemPadding?: number;
  colorRange?: string[];
  xAxis?: string;
  yAxis?: string;
  legends?: IEnumItem[];
  emptyText?: string;
  renderEmpty?: () => React.ReactNode;
  loading?: boolean;
  renderLoading?: () => React.ReactNode;
  legendAlign?: 'flex-start' | 'center' | 'flex-end';
  legendKey?: string;
  legendSize?: number;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  formatValue?: (value: any) => string;
  formatXAxisText?: (date: any) => string;
  transformData?: (data: any[], legends: IEnumItem[], legendKey?: string, yAxis?: string) => any[];
}

const defaulColorRange = ['#00E676', '#2979FF', '#651FFF', '#FF1744'];

export const StackChart = ({
  data,
  width,
  legends = [],
  height = 240,
  itemPadding = 1 / 3,
  style,
  className = '',
  xAxis = 'date',
  yAxis = 'value',
  showZeroLine = true,
  legendKey = 'type',
  legendAlign = 'flex-start',
  legendPosition = 'top',
  legendSize = 8,
  colorRange = defaulColorRange,
  loading = false,
  renderLoading,
  emptyText = 'no data',
  renderEmpty,
  formatValue = (value: any) => value,
  formatXAxisText = (data: any) => data[xAxis],
  transformData = transformSeriesData,
}: StackChartProps) => {
  const containerRef = useRef<any>();
  const chartRef = useRef<any>();
  const chartData = useMemo(() => transformData ? transformData(data, legends, legendKey, yAxis) : data, [data, legends]);
  const length = useMemo(() => data.length, [data]);
  const legendRef = useRef<any>(legends);

  const getRangeY = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const rangeY = Math.floor((rect.width - 75) / length) * 2 * (1 - itemPadding);
    return rangeY;
  };

  const initChart = () => {
    const chart = new Chart({
      container: containerRef.current,
      width,
      height,
      autoFit: true,
    });

    chartRef.current = chart;

    chart.on('legend:filter', (e) => {
      const { nativeEvent, data } = e;
      if (!nativeEvent) return;
      legendRef.current = legends.map((item) => {
        return {
          ...item,
          unchecked: !data.values.includes(item.value),
        };
      });
    });

    chart.on('legend:reset', (e) => {
      const { nativeEvent } = e;
      if (!nativeEvent) return;
      legendRef.current = legends;
    });

    // 更新尺寸时，列的宽度也要更新
    chart.on(ChartEvent.BEFORE_CHANGE_SIZE, () => {
      const _rangeY = getRangeY();
      const options: any = chart.options();

      if (options.children?.length) {
        options.children[0].scale.size.range = [0, _rangeY];
      }
    });
  };

  const renderChart = (_chartData: any[]) => {
    if (!chartRef.current) return;

    chartRef.current.clear();
    const rangeY = getRangeY();

    chartRef.current
      .interval()
      .data(_chartData)
      .transform({ type: 'stackY', reverse: true })
      .encode('x', formatXAxisText)
      .encode('y', yAxis)
      .encode('color', legendKey)
      .encode('size', (_: any, index: number) => {
        return index < 0 ? 0 : 1;
      })
      .scale('size', { range: [0, rangeY] })
      .scale('color', {
        range: colorRange,
      })
      .legend({
        color: {
          position: legendPosition,
          itemMarkerSize: legendSize,
          itemLabelText: (datum: any) => {
            const legend = legends.find((item) => item.value === datum.id);
            return legend?.label || datum.label;
          },
          layout: {
            justifyContent: legendAlign,
          },
        },
        size: false,
      })
      .axis('x', {
        line: true,
        grid: false,
        title: false,
        size: 10,
        labelFontSize: 12,
        transform: [
          {
            type: 'hide',
            keepHeader: true,
            keepTail: true,
          },
        ],
      })
      .axis('y', {
        title: false,
        grid: true,
        gridStroke: '#E8EAED',
        gridStrokeOpacity: 1,
        gridLineDash: [2, 0],
        labelFontSize: 12,
        labelSpacing: 10,
        transform: [
          {
            type: 'hide',
            keepHeader: true,
            keepTail: true,
          },
        ],
        labelFormatter: formatValue,
      })
      .interaction('elementHighlight', { background: true })
      .interaction('legendFilter', true)
      .interaction('tooltip', {
        render: (_: any, { title }: any) => {
          const curData = data.find(a => formatXAxisText(a) === title);

          const str = legendRef.current.map((item: { label: string; value: string; unchecked: boolean; }, index: number) => {
            if (item.unchecked) return '';
            return `<div class="${classExprRaw`stack-chart-item`}">
            <div class="${classExprRaw`stack-chart-item-label-wrapper`}">
              <div class="${classExprRaw`stack-chart-item-dot`}" style="background-color: ${colorRange[index]};"></div>
              <div class="${classExprRaw`stack-chart-item-label`}">${item.label}</div>
            </div>
            <div>${curData ? formatValue(curData[item.value]) : '-'}</div>
            </div>`
          }).join('\n');

          return `<div><div class="${classExprRaw`stack-chart-title`}">${title}</div>${str}</div>`;
        },
      });

    if (showZeroLine && chartData.length) {
      chartRef.current.lineY().data([0]).style('lineWidth', 2).style('stroke', '#C5CBD3').style('strokeOpacity', 1);
    }

    chartRef.current.render();
  };

  useEffect(() => {
    initChart();

    // 禁用右键菜单
    containerRef.current?.addEventListener('contextmenu', (e: any) => {
      e.preventDefault();
    });
  }, []);

  useEffect(() => {
    renderChart(chartData);
  }, [chartData]);

  const renderChartEmpty = () => {
    if (renderEmpty) {
      return renderEmpty();
    }

    return (
      <>
        <img src="https://img.alicdn.com/imgextra/i4/O1CN01rI69kq29lW4CyuMv5_!!6000000008108-55-tps-160-160.svg" />
        <div>{emptyText}</div>
      </>
    )
  }

  return (
    <div
      className={`${classExprRaw`stack-chart`} ${className}`}
      style={{ width, height, ...style }}
      ref={containerRef}
    >
      {loading && renderLoading && (
        <div className={classExprRaw`stack-chart-wrapper`}>
          {renderLoading()}
        </div>
      )}
      {
        !loading && data.length === 0 && (
          <div className={classExprRaw`stack-chart-wrapper`}>
            {renderChartEmpty()}
          </div>
        )
      }
    </div>
  );
};
