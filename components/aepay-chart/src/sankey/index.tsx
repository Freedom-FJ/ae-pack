import React, { useEffect, useRef } from 'react';
import { Runtime, extend, corelib, graphlib, ELEMENT_CLASS_NAME } from '@antv/g2';
import { classExprRaw } from '../utils';
import './index.scss';

// 按需加载
const Chart = extend(Runtime, {
  ...corelib(),
  ...graphlib()
});

export interface IDataItem extends Record<string, any> {
  label: string;
  value: number;
  children?: IDataItem[];
}

type INodeKey = (node: IDataItem) => string;
type INodeValue = (data: IDataItem) => string | number;

export interface SankeyProps {
  className: string;
  style: React.CSSProperties;
  data: IDataItem[];
  width?: number;
  height?: number;
  linkColorRange?: string[];
  nodeColorRange?: string[];
  nodeGap?: number;
  nodeWidth?: number;
  nodeKey?: INodeKey;
  nodeValue?: INodeValue;
  formatValue?: INodeValue;
  formatLabel?: INodeValue;
}

function parseData(data: IDataItem[], nodeKey: INodeKey, nodeValue: INodeValue) {
  if (!data?.length) return [];

  return data.reduce((acc, item) => {
    if (item.children?.length) {
      item.children.forEach((child) => {
        acc.push({
          source: nodeKey(item),
          target: nodeKey(child),
          value: nodeValue(child),
        });

        if (child.children?.length) {
          acc = acc.concat(parseData([child], nodeKey, nodeValue));
        }
      });
    }
    return acc;
  }, []);
}

const defaultLinkColorRange = ['#E3F2FD', '#E8F5E9', '#FFEBEE'];
const defaultNodeColorRange = ['#0100CA', '#2979FF', '#651FFF', '#66FFA6', '#FF616F', '#75A7FF', '#A255FF'];

export const Sankey = ({
  data,
  width,
  height = 240,
  style,
  className = '',
  nodeGap = 12,
  nodeWidth = 16,
  linkColorRange = defaultLinkColorRange,
  nodeColorRange = defaultNodeColorRange,
  nodeKey = (node: IDataItem) => node.label,
  nodeValue = (node: IDataItem) => node.value,
  formatValue = (data: IDataItem) => data.value,
  formatLabel
}: SankeyProps) => {
  const containerRef = useRef<any>();
  const chartRef = useRef<any>();

  const initChart = () => {
    const chart = new Chart({
      container: containerRef.current,
      width,
      height,
      autoFit: true,
      padding: 0,
    });

    chartRef.current = chart;

    const rect = containerRef.current?.getBoundingClientRect();

    chart
      .sankey()
      .data({
        value: data,
        transform: [
          {
            type: 'custom',
            callback: (d: IDataItem[]) => {
              let nodes: any = [];
              const links = parseData(d, (node: any) => {
                if (!nodes.find((item: any) => item.key === nodeKey(node))) {
                  nodes.push({
                    key: nodeKey(node),
                    data: node
                  });
                }
                return nodeKey(node);
              }, nodeValue);

              return {
                links,
                nodes
              }
            }
          },
        ],
      })
      .layout({
        nodeAlign: 'center',
        nodePadding: nodeGap / rect.height,
        nodeWidth: nodeWidth / rect.width,
      })
      .scale('color', { range: nodeColorRange })
      .style('labelSpacing', 8)
      .style('labelColor', '#2B323B')
      .style('labelText', (node: any) => {
        if (typeof formatLabel === 'function') {
          return formatLabel(node.data);
        }

        return node.key;
      })
      .style('labelAlign', 'left')
      .style('labelFontWeight', 'bold')
      .style('labelFontSize', (node: any) => {
        if ((node.y1 - node.y0) * rect.height > 30) {
          return 14;
        }
        return 12;
      })
      .style('nodeStrokeWidth', 0)
      .style('linkFillOpacity', 1)
      .style('linkFill', (node: any) => {
        return linkColorRange[node.index % linkColorRange.length];
      })
      .tooltip({
        items: [],
        linkTitle: (d: any) => {
          return `${d.source.key} -> ${d.target.key}`;
        },
        linkItems: [
          (d: any) => {
            const node = d.source;
            return {
              name: node.key,
              value: formatValue(node.data),
              color: nodeColorRange[node.index]
            }
          },
          (d: any) => {
            const node = d.target;

            return {
              name: node.key,
              value: formatValue(node.data),
              color: nodeColorRange[node.index]
            }
          },
        ],
        nodeItems: [
          (d: any) => {
            return {
              name: d.key,
              value: formatValue(d.data)
            }
          },
        ],
      });

    // 渲染完成之后绑定交互
    chart.render().then((c: any) => {
      const { canvas } = c.getContext();

      // 找到图形元素
      const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME);

      // 高亮
      for (const element of elements) {
        element.addEventListener('mouseenter', () => {
          element.style._fill = element.style.fill;
          element.style._opacity = element.style.opacity;

          if (element.__data__?.shape === 'ribbon') {
            element.style.fill = '#000';
            element.style.opacity = 0.1;
          } else {
            element.style.opacity = 0.5;
          }
        });

        element.addEventListener('mouseleave', () => {
          element.style.fill = element.style._fill;
          element.style.opacity = element.style._opacity;
        });
      }
    });

    return chart.getContainer();
  };

  useEffect(() => {
    initChart();

    // 禁用右键菜单
    containerRef.current?.addEventListener('contextmenu', (e: any) => {
      e.preventDefault();
    });
  }, []);

  return (
    <div
      className={`${classExprRaw`sankey`} ${className}`}
      style={{ width, height, ...style }}
      ref={containerRef}
    />
  )
}