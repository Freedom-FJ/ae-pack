import { logger } from '@ali/aepay-utils';
import { RecognitionStatus } from './interface';

export default class Log {
  private startTime = Date.now();
  private prevStatusTime = Date.now();
  private prevStatus: RecognitionStatus = RecognitionStatus.INIT;
  private uid: string;
  private flowId: string;
  private retryCount: number;

  constructor(params: any) {
    this.uid = params.facialScanApplyId;
    this.retryCount = 0;
  }

  private getEventName = (name: string) => {
    return `ekyc-face-pc-${name}`;
  };

  makeLogger(eventId: string, params: any, et: 'CLK' | 'EXP' = 'CLK') {
    const now = Date.now();

    logger.makeLogger(this.getEventName(eventId), et, {
      c1: this.flowId,
      c2: this.uid,
      c4: now - this.startTime,
      c5: now,
      ...params,
    });
  }

  enterPage(params: any) {
    const now = Date.now();
    this.startTime = now;
    this.prevStatusTime = now;
    this.makeLogger('enterPage', params, 'EXP');
  }

  uploadClk({ country, certificate }: any) {
    this.makeLogger('uploadClk', {
      c3: `${country}-${certificate}`,
    });
  }

  retryClk({ country, certificate }: any) {
    const now = Date.now();
    this.retryCount += 1;
    this.makeLogger('retryClk', {
      c3: `${country}-${certificate}`,
      c4: this.retryCount,
      c5: now - this.startTime,
      c6: now,
    });

    this.startTime = now;
    this.prevStatusTime = now;
  }

  resetFaceClk({ country, certificate }: any) {
    const now = Date.now();

    this.makeLogger('resetFaceClk', {
      c3: `${country}-${certificate}`,
      c4: now - this.startTime, // 距开始扫脸时间差
      c5: now,
    });

    this.startTime = now;
    this.prevStatusTime = now;
  }

  queryResultExp(status: RecognitionStatus) {
    if (this.prevStatus === status) {
      return;
    }

    const now = Date.now();
    this.makeLogger(`queryResult_${status}`, {
      c1: this.flowId,
      c3: now - this.prevStatusTime, // 上一个状态时间差
    });

    this.prevStatusTime = now;
    this.prevStatus = status;
  }

  // 生成QRCode
  setFacialScanFlowId(flowId: string, uid: string) {
    this.flowId = flowId;
    this.uid = uid;

    this.makeLogger('generateQRCode', { c1: this.flowId });
  }

  // 回调上报
  callBack() {
    this.makeLogger('callBack', { c1: this.flowId });
  }
}