export interface IBaseComponent {
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface IOption<V = string, P = any> extends Record<string, any> {
  label?: string | JSX.Element;
  value: V;
  payload?: P;
  children?: Array<IOption<V>>;
}
