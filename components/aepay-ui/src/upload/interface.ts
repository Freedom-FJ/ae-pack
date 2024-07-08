import { IBaseComponent } from "../interface";

export type IFileExt = '.png' | '.jpg' | '.jpeg' | '.tif' | '.pdf' | '.doc' | '.docx' | '.csv' | '.xls' | '.xlsx';

interface IReqParam {
  file: File;
  onError: (err: Error, ret?: any) => void;
  onSuccess: (data: IFileData) => void;
  onProgress: (params: { percent: number }) => void;
}

export interface IUploaderProps extends IBaseComponent {
  /**
   * 是否禁用
   */
  disabled?: boolean;
  // 是否预览 
  isPreview?: boolean;
  /**
   * 是否隐藏下载按钮
   */
  hiddenDownload?: boolean;
  /**
   * 文件数量限制
   * @default 5
   */
  limit?: number;
  /**
   * 上传组件数量，当有多个上传组件时，limit为1
   * @default 1
   */
  uploaderCount?: number;
  /**
   * 按钮显示内容
   */
  placeholder?: string | string[];
  /**
   * 提示文案展示位置
   * @default "bottom"
   */
  tipPlacement?: 'top' | 'bottom';
  /**
   * 自定义提示文案
   */
  renderTip?: () => React.ReactElement;
  /**
   * 上传列表的样式
   * @default "text"
   */
  listType?: 'text' | 'card' | 'image';
  /**
   * 按钮类型
   * @default primary
   */
  btnType?: 'normal' | 'primary' | 'secondary';
  // 文件类型
  accept?: IFileExt[];
  // 是否支持多选
  multiple?: boolean;
  customRequest?: (option: IReqParam) => Promise<IFileData>;
  onProgress?: () => void;
  onAbort?: (file: File) => void;
  onChange?: (files: File[]) => void;
  onRemove?: (file: File) => Boolean | Promise<Boolean>;
  /**
   * 文件大小限制
   * @default 10M
   */
  maxSize?: number;
  /**
   * 文件最小限制
   * @default 100K
   */
  minSize?: number;
  /**
   * 全部文件大小限制
   * @default 60M
   */
  allMaxSize?: number;

  value?: (File & { url?: string })[];

}

export interface IFileData {
  fileName: string;
  filename: string;
  url?: string;
  name?: string;
}

export interface IUploadFile {
  originFileObj?: File & { thumbUrl: string; };
  /** File.name */
  name: string;
  /** File.size */
  size?: number;
  /** File.type */
  type?: string;
  /** File.uid */
  uid?: string;
  /** File.lastModified */
  lastModified?: number;
  /** File.lastModifiedDate */
  lastModifiedDate?: Date;
  fileName?: string;

  url: string;
  imgURL?: string;
  downloadURL?: string;

  error?: Error;
  response?: IFileData;
  percent?: number;
  state?: 'selected' | 'done' | 'uploading' | 'error';

  /** 在回填数据的时候，只有 filename，需要重新请求并填充数据，在此期间组件显示为 loading 状态 */
  name4FillURL?: string;
}