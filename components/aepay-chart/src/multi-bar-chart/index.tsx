import React, { useEffect, useMemo, useRef } from 'react';
import { corelib, extend, Runtime } from '@antv/g2';
import { type IEnumItem, classExprRaw, transformSeriesData } from '../utils';
import './index.scss';

// 按需加载
const Chart = extend(Runtime, corelib());

export interface MultiBarChartProps {
  className: string;
  style: React.CSSProperties;
  data: any[];
  width?: number;
  height?: number;
  showZeroLine?: boolean;
  itemPadding?: number;
  colorRange?: string[];
  xAxis?: string;
  yAxis?: string;
  legends?: IEnumItem[];
  legendAlign?: 'flex-start' | 'center' | 'flex-end';
  legendKey?: string;
  legendSize?: number;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  formatValue?: (value: any) => string;
  formatXAxisText?: (date: any) => string;
  transformData?: (data: any[], legends: IEnumItem[], legendKey?: string, yAxis?: string) => any[];
}

const defaulColorRange = ['#00E676', '#2979FF', '#651FFF', '#FF1744'];

export const MultiBarChart = ({
  data,
  width,
  legends = [],
  height = 240,
  itemPadding = 0,
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
  formatValue = (value: any) => value,
  formatXAxisText = (data: any) => data[xAxis],
  transformData = transformSeriesData,
}: MultiBarChartProps) => {
  const containerRef = useRef<any>();
  const chartRef = useRef<any>();
  const legendRef = useRef<any>(legends);
  const chartData = useMemo(() => transformData ? transformData(data, legends, legendKey, yAxis) : data, [data, legends]);

  const initChart = () => {
    const chart = new Chart({
      container: containerRef.current,
      width,
      height,
      autoFit: true,
    });

    chartRef.current = chart;

    chart
      .interval()
      .transform({ type: 'dodgeX', padding: itemPadding })
      .encode('x', formatXAxisText)
      .encode('y', yAxis)
      .encode('color', legendKey)
      .scale('color', {
        range: colorRange,
      })
      .legend({
        color: {
          position: legendPosition,
          itemMarkerSize: legendSize,
          itemLabelText: (datum: any) => {
            const legend = legends.find(item => item.value === datum.id);
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
        transform: [{
          type: 'hide',
          keepHeader: true,
          keepTail: true,
        }],

      })
      .axis('y', {
        title: false,
        grid: true,
        gridStroke: '#E8EAED',
        gridStrokeOpacity: 1,
        gridLineDash: [2, 0],
        labelFontSize: 12,
        labelSpacing: 10,
        transform: [{
          type: 'hide',
          keepHeader: true,
          keepTail: true,
        }],
        labelFormatter: formatValue,
      })
      .interaction('elementHighlight', { background: true })
      .interaction('legendFilter', true)
      .interaction('tooltip', {
        render: (_: any, { title }: any) => {
          const curData = data.find(a => formatXAxisText(a) === title);

          const str = legendRef.current.map((item: { label: string; value: string; unchecked: boolean; }, index: number) => {
            if (item.unchecked) return '';
            return `<div class="${classExprRaw`multi-bar-item`}">
            <div class="${classExprRaw`multi-bar-item-label-wrapper`}">
              <div class="${classExprRaw`multi-bar-item-dot`}" style="background-color: ${colorRange[index]};"></div>
              <div class="${classExprRaw`multi-bar-item-label`}">${item.label}</div>
            </div>
            <div>${curData ? formatValue(curData[item.value]) : '-'}</div>
            </div>`
          }).join('\n');

          return `<div><div class="${classExprRaw`multi-bar-title`}">${title}</div>${str}</div>`;
        },
      });

    chart.on('legend:filter', (e) => {
      const { nativeEvent, data } = e;
      if (!nativeEvent) return;
      legendRef.current = legends.map(item => {
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
  };

  useEffect(() => {
    initChart();

    // 禁用右键菜单
    containerRef.current?.addEventListener('contextmenu', (e: any) => {
      e.preventDefault();
    });
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (showZeroLine) {
        chartRef.current.lineY().data([0]).style('lineWidth', 2).style('stroke', '#C5CBD3').style('strokeOpacity', 1);
      }

      chartRef.current.data(chartData || []);
      chartRef.current.render();
    }
  }, [chartData]);

  return (
    <div
      className={`${classExprRaw`mutli-bar-chart`} ${className}`}
      style={{ width, height, ...style }}
      ref={containerRef}
    />
  )
}