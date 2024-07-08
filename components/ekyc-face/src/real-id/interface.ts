export interface IRes<T> {
  code: number;
  data: T;
}

export interface IEnum {
  label: string;
  value: string;
}

export enum RecognitionStatus {
  INVALID = 'invalid', // 非法或已失效的UUID
  INIT = 'init', // 初始化成功，生成UUID与mid的映射关系
  SCANNING = 'scanning', // 二维码扫描成功，手机端开始打开页面；扫描证件、扫脸无状态
  FACE_SUCCESS = 'face_success', //	扫脸成功
  SUCCESS = 'success', //	扫脸+大陆库比对成功
  FAILURE = 'failure', //	扫脸或大陆库比对失败
  PENDING = 'pending', //	业务流程中
  CANCEL = 'cancel', //	用户主动中断
}

export type ICertificateType = 'ID_CARD' | 'PASSPORT';
export type ILocale = 'zh_CN' | 'en_US';
export type ITenant = 'B1X' | 'BG2' | 'BE4' | 'BG2_SG001' | 'B1X_SG001';

export interface IInitValue {
  country: string;	// 国家
  certificate: ICertificateType; // 证件类型
  showResetBtn: boolean; // 是否展示重新扫脸按钮
}

export interface ICallbackOptions extends Partial<IInitValue> {
  status: RecognitionStatus; // 是否自动跳转
  faceRecognitionId?: string; // 扫脸结果ID
  facialScanApplyId: string; // 扫脸ID
  redirect: boolean; // 是否自动跳转
}

export interface FaceRecognitionProps {
  // 当前语言
  locale?: ILocale;
  // 租户
  tenant: ITenant;
  // 商户申请扫脸ID，由商服生成，前端透传
  facialScanApplyId: string;
  // 仅展示扫脸部分 - 隐藏国家和地区部分
  onlyShowFace?: boolean;
  // 回调事件
  onCallback?: (params: ICallbackOptions) => void;
  // 初始数据
  initValue?: Partial<IInitValue>;
  // 值变动回调
  onValuesChanged?: (data?: Partial<IInitValue>) => void;
  // 表单属性
  fieldProps?: {
    country?: Record<string, any>;
    certificate?: Record<string, any>;
  };
}

export interface IApplyFaceParam {
  locale: ILocale;
  countryCode: string;
  certificationType: string;
  facialScanApplyId: string;
}

export interface IApplyFaceResult {
  facialScanFlowId: string;
  timeoutMinutes: number;
  url: string;
}

export interface IQueryResult {
  faceRecognitionId: string;
  facialScanApplyId: string;
  status: RecognitionStatus;
}