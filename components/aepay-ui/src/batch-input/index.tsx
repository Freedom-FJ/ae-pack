import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Input, Overlay } from '@alifd/next';
import type { InputProps } from '@alifd/next/types/input';
import type { PopupProps } from '@alifd/next/types/overlay';
import { IBaseComponent } from '../interface';
import { classExprRaw } from '../utils';
import { usePropsValue } from '@ali/aepay-hooks';
import useLocale from '../locale';
import './index.scss';

export interface IBatchInputProps extends IBaseComponent, InputProps {
  // 自定义 trigger
  trigger?: React.ReactElement;
  // 弹层的属性，详见Overlay组件属性
  popupProps?: PopupProps;
  // 最大所支持的行的数量
  maxLineLength?: number;
  // 输入框的类型
  type?: 'number' | 'string';
  // 每一行的校验器，校验不通过返回false，则会阻断用户此次输入
  validator?: (value: string) => boolean | undefined;
  // 是否转换为字符串
  parseToString?: boolean;
  // 转换器
  transformer?: {
    getValueFormatter: (value: string) => any[];
    setValueFormatter: (value: any[]) => string;
  };
}

const BatchInput = ({
  placeholder,
  style,
  popupProps,
  value,
  defaultValue,
  onChange,
  hasClear,
  trigger,
  parseToString,
  transformer,
  validator,
  maxLineLength = 500,
  type = 'string',
  className = '',
}: IBatchInputProps) => {
  const $i18n = useLocale();
  const [lines, setLines] = usePropsValue<any>({
    value: value,
    defaultValue: defaultValue,
    onChange,
    transformer: (transformer || parseToString) && {
      getValueFormatter: (v: string) => {
        if (parseToString) {
          return typeof v === 'string' ? v.split(',').map((item: string) => item.trim()).filter(Boolean) : [];
        } else {
          return transformer?.getValueFormatter(v);
        }
      },
      setValueFormatter: (v: any[]) => {
        if (parseToString) {
          return v.filter(Boolean).join(',');
        } else {
          return transformer?.setValueFormatter(v);
        }
      }
    }
  });

  const raw = Array.isArray(lines) ? lines : [];
  const maxLength = maxLineLength ?? 0;
  const triggerClassName = classExprRaw`batch-input-trigger`;

  const [popupVisible, setPopupVisible] = useState(false);
  const textRef = useRef<any>(null);
  const areaRef = useRef<any>(null);
  const hasEndLineRef = useRef(false);

  useEffect(() => {
    if (areaRef.current && popupVisible) {
      areaRef.current.focus();
      const text = raw.join('\n');
      const node = areaRef.current?.getInputNode();
      if (node) {
        node.setSelectionRange(text.length, text.length);
        node.scrollTop = node.scrollHeight;
        node.focus();
      }
    }
  }, [popupVisible]);

  const renderTrigger = () => {
    if (React.isValidElement(trigger)) {
      return (
        <span style={{ display: 'inline-block', width: '100%' }} ref={textRef}>
          {
            React.cloneElement(trigger as React.ReactElement, {
              style,
              className: triggerClassName
            })
          }
        </span>
      );
    }

    return (
      <Input
        ref={textRef}
        placeholder={placeholder || $i18n['aepayui.BatchInput.Placeholder']}
        hasClear={hasClear}
        className={`${triggerClassName} ${className}`}
        style={style}
        value={(raw || []).filter(Boolean).join(',')}
        onChange={(value) => {
          if (!value) {
            setLines([]);
            setTimeout(() => {
              areaRef.current?.getInputNode().focus();
            }, 0);
            return;
          }
        }}
        onFocus={() => {
          setTimeout(() => {
            setPopupVisible(true);
          }, 200);
        }}
      />
    );
  };

  const handleChange = (text: string) => {
    let v = text.replace(/，|,|\s+/g, '\n').split('\n')
      .map((item: string) => item.trim())
      .map((value: string) => (value === '' ? null : value));

    // 标记是否换行
    hasEndLineRef.current = v.length && v[v.length - 1] === null;
    // 截断
    const newLines = maxLength ? v.filter(Boolean).slice(0, maxLength) : v.filter(Boolean);

    // 校验不通过阻断
    if (validator && newLines.some((item) => validator(item) === false)) {
      return;
    }

    if (type === 'string') {
      setLines(newLines);
    }

    // 转换数字
    if (type === 'number' && !newLines.some((item) => isNaN(Number(item)))) {
      setLines(newLines.map((item) => Number(item)));
    }
  }

  return (
    <Overlay.Popup
      trigger={renderTrigger()}
      triggerType="click"
      {...popupProps}
      className={`${classExprRaw`batch-input-popup`} ${popupProps?.className}`}
      visible={popupVisible}
      onVisibleChange={(visible) => setPopupVisible(visible)}
    >
      <span
        onKeyPress={(e) => {
          e.stopPropagation();
        }}
      >
        <Input.TextArea
          rows={10}
          ref={areaRef}
          placeholder={placeholder}
          className={classExprRaw`batch-textarea`}
          style={{
            width: (ReactDOM.findDOMNode(textRef.current) as HTMLDivElement)?.offsetWidth,
          }}
          value={raw.join('\n') + (hasEndLineRef.current && (raw.length ?? 0) !== 0 ? '\n' : '')}
          onChange={(v: string) => {
            handleChange(v);
          }}
        />
        {maxLineLength && (
          <span className={classExprRaw`batch-textarea-count`}>
            {raw.length ?? 0}/{maxLength}
          </span>
        )}
      </span>
    </Overlay.Popup>
  );
};

export default React.forwardRef(BatchInput);