import { useMtop } from "@ali/aepay-hooks";
import { useEffect } from "react";
import { IApplyFaceParam, IApplyFaceResult, IEnum, IQueryResult, IRes, ITenant, RecognitionStatus } from "./interface";
import { type MtopConfig } from "@ali/aepay-utils";

export const API = {
  getCountryList: 'mtop.aepay.ekyc.face.country.list',
  getCertificationList: 'mtop.aepay.ekyc.face.certification.list',
  applyFace: 'mtop.aepay.ekyc.face.apply',
  queryResult: 'mtop.aepay.ekyc.face.query'
}

function isPreEnv() {
  return /pre-/.test(location.host) || /pre-/.test((window as any).mtopConfig?.subDomain);
}

/**
 * @title 根据租户设置mtop信息
 * @description 为了尽可能避免全局拦截器影响，这个并没有采用拦截器处理
 * @param tenant 
 * @returns 
 */ 
export function getMtopConfigByTenant(tenant: ITenant) {
  let mtopConfig: MtopConfig = {
    mainDomain: "aliexpress.com",
  };

  if (tenant === 'BG2' || tenant === 'BG2_SG001') {
    mtopConfig.subDomain = `${isPreEnv() ? 'pre-' : ''}aepay-sg-bg2-acs`;
  } else if (tenant === 'B1X' || tenant === 'BE4' || tenant === 'B1X_SG001') {
    mtopConfig.subDomain = `${isPreEnv() ? 'pre-' : ''}aepay-sg-acs`;
  }

  return {
    mtopConfig,
    headers: { tenant }
  }
}

/**
 * 获取国家列表
 * @param locale 
 * @returns 
 */
export function useCountryList(locale: string, tenant: ITenant): { loading: boolean; data: IEnum[]; } {
  const { loading,data } = useMtop<IRes<IEnum[]>>(API.getCountryList, {
    defaultParams: [{
      locale,
    }],
    cache: true,
    ignoreInterceptors: true,
    mtopParams: getMtopConfigByTenant(tenant),
  });

  return {
    loading,
    data: data?.data || []
  };
}

/**
 * 通过国家列表查证件类型
 * @param locale 
 * @param countryCode 
 * @returns 
 */
export function useCertificationList(locale: string, countryCode: string, tenant: ITenant): { loading: boolean; data: IEnum[]; } {
  const { loading, data, run, mutate } = useMtop<IRes<IEnum[]>>(API.getCertificationList, {
    manual: true,
    ignoreInterceptors: true,
    mtopParams: getMtopConfigByTenant(tenant),
  });

  useEffect(() => {
    if (locale && countryCode) {
      mutate([]); // 清空列表项
      run({
        locale,
        countryCode
      });
    }
  }, [locale, countryCode]);

  return {
    loading,
    data: data?.data || []
  };
}

/**
 * 申请扫脸URL接口
 * @param param 
 * @param onSuccess 
 * @returns 
 */
export function useApplyFace(param: IApplyFaceParam & { tenant: ITenant; }, onSuccess: (data: IApplyFaceResult) => void) {
  const { locale, countryCode, certificationType, facialScanApplyId, tenant } = param;
  const { loading, data, run, refresh, mutate } = useMtop<IRes<IApplyFaceResult>>(API.applyFace, {
    manual: true,
    ignoreInterceptors: true,
    mtopParams: getMtopConfigByTenant(tenant),
    onSuccess: (d: any) => onSuccess(d?.data?.data as IApplyFaceResult),
  });

  useEffect(() => {
    if (locale && countryCode && certificationType && facialScanApplyId) {
      run({
        locale,
        countryCode,
        certificationType,
        facialScanApplyId
      });
    }
  }, [locale, countryCode, certificationType, facialScanApplyId]);

  return {
    loading,
    refresh,
    mutate: (d: Partial<IApplyFaceResult>) => mutate({ data: d }),
    data: data?.data || {} as IApplyFaceResult,
  };
}

/**
 * 查询扫脸进度
 * @param facialScanFlowId 扫脸流程ID
 * @returns 
 */
export function useQueryResult({ tenant, onSuccess, onError }: {
  tenant: ITenant;
  onSuccess: (data: IQueryResult) => void;
  onError?: (e: Error) => void;
}) {
  return useMtop<IRes<IQueryResult>>(API.queryResult, {
    manual: true,
    retryCount: -1,
    ignoreInterceptors: true,
    showError: false,
    mtopParams: getMtopConfigByTenant(tenant),
    autoRetry: (res: IRes<IQueryResult>) => {
      // 接口异常也会轮询
      if (!res?.data?.status) {
        return true;
      }

      return [
        RecognitionStatus.SCANNING,
        RecognitionStatus.FACE_SUCCESS,
        RecognitionStatus.PENDING
      ].includes(res?.data?.status);
    },
    onSuccess: (d: any) => onSuccess(d?.data?.data as IQueryResult),
    onError,
  });
}