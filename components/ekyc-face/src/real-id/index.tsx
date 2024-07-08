import React, { useCallback, useEffect, useState, useRef } from 'react';
import { classExprRaw } from '../utils';
import { Button, Dialog, Field, Form, Loading, Message, Select } from '@alifd/next';
import locales from './locale';
import QRCode from 'qrcode.react';
import { API, getMtopConfigByTenant, useApplyFace, useCertificationList, useCountryList, useQueryResult } from './service';
import { FaceRecognitionProps, ICallbackOptions, ICertificateType, RecognitionStatus } from './interface';
import { useLocale, useTimeout } from '@ali/aepay-hooks';
import Log from './log';
import { mtop } from '@ali/aepay-utils';
import './index.scss';

function FaceRecognition(props: FaceRecognitionProps) {
  const { onlyShowFace, facialScanApplyId, locale, tenant, fieldProps = {}, initValue = {}, onValuesChanged, onCallback: _onCallback } = props;
  const [showResetBtn, setShowResetBtn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const field = Field.useField({
    onChange: () => {
      // 值变动时通知商服置灰下一步按钮
      const values = field.getValues();
      onValuesChanged?.(values);
    }
  });

  const onCallback = (params: ICallbackOptions) => {
    if (_onCallback) {
      _onCallback(params);
    }

    logger.current.callBack();
  }

  const $i18n = useLocale({
    language: locale,
    locales,
    defaultLocale: 'zh_CN',
    mdsConfig: {
      appName: 'aepay-risk-app',
      version: '0.0.2',
      label: 'Frontside',
    }
  });
  const logger = useRef(new Log({ facialScanApplyId }));
  const country: string = field.getValue('country');
  const certificate: ICertificateType = field.getValue('certificate');
  const { loading: countryListLoading, data: countryList } = useCountryList(props.locale, tenant);
  const { loading: certificationListLoading, data: certificationList } = useCertificationList(props.locale, country, tenant);
  const { cancel, run: queryResult } = useQueryResult({
    tenant,
    onSuccess: (res) => {
      const status = res?.status;
      logger.current.queryResultExp(status);
      console.log('onSuccess...', res?.status);

      switch (status) {
        case RecognitionStatus.INVALID: {
          Message.error($i18n['ekyc.face.invalidParam']);
          break;
        }
        case RecognitionStatus.SCANNING: {
          // 仅第一次重置倒计时
          if (!pending) {
            resetTime();
            setPending(true);
          }
          break;
        }
        case RecognitionStatus.PENDING: {
          break;
        }
        case RecognitionStatus.FAILURE: {
          setPending(false);
          onCallback({
            status: RecognitionStatus.FAILURE,
            redirect: true,
            facialScanApplyId,
            country,
            certificate,
            faceRecognitionId: res.faceRecognitionId
          });
          break;
        }
        case RecognitionStatus.CANCEL: {
          toDowngrade(true);
          clearTimeout();
          break;
        }
        case RecognitionStatus.SUCCESS: {
          setPending(false);
          onCallback({
            status: RecognitionStatus.SUCCESS,
            redirect: true,
            facialScanApplyId,
            country,
            certificate,
            faceRecognitionId: res.faceRecognitionId
          });
        }
        default: break;
      }
    },
    onError: (e) => {
      // setPending(false);
      console.log('queryResult onError...', e);
    }
  });
  const { data, mutate, refresh } = useApplyFace({
    locale: props.locale,
    countryCode: country,
    certificationType: certificate,
    facialScanApplyId,
    tenant
  }, (res) => {
    // 取消轮询
    cancel();

    console.log('apply face success...', res);
    if (!res?.facialScanFlowId || !res?.url) {
      onCallback({
        status: RecognitionStatus.FAILURE,
        redirect: false,
        facialScanApplyId,
        country,
        certificate
      });

      // 清理倒计时
      clearTimeout();
    } else {
      // 设置flowId用于关联和h5路径
      logger.current.setFacialScanFlowId(res.facialScanFlowId, facialScanApplyId);

      if (!showResetBtn) {
        queryResult({
          facialScanFlowId: res.facialScanFlowId
        });
      }
    }
  });

  /**
   * 1. 退回扫脸阶段：有重新扫脸按钮，不降级；没有（点击重新扫脸）需要降级
   * 2. 初始阶段：如果已降级不弹
   * 3. 触发降级弹框，需要中断结果轮询
   * 4. 降级弹框弹出后，再次点击重新尝试，逻辑重置（4分钟后再弹降级弹框）
   * 5. 降级弹框逻辑：进入后倒计时开始4分钟，扫码后重置4分钟
  */
  const toDowngrade = useCallback((force = false) => {
    if (!showResetBtn && data?.facialScanFlowId || force) {
      setVisible(true);
      setPending(false);
      // 取消结果轮询
      cancel();

      logger.current.makeLogger('downgrade', { c1: data?.facialScanFlowId, c3: force }, 'EXP');
    }
  }, [showResetBtn, data?.facialScanFlowId]);

  const { clear: clearTimeout, resetTime } = useTimeout(toDowngrade, data.timeoutMinutes * 60 * 1000);

  useEffect(() => {
    if (initValue.showResetBtn) {
      setShowResetBtn(true);
    }

    field.setValues({
      country: initValue.country || 'CN',
      certificate: initValue.certificate || 'ID_CARD'
    });
  }, [JSON.stringify(initValue)]);

  useEffect(() => {
    logger.current.enterPage({ c3: JSON.stringify(initValue) });
  }, []);

  const onReset = () => {
    if (!country || !certificate) {
      field.validate();
      return;
    }

    setShowResetBtn(false);
    refresh();
    resetTime();

    logger.current.resetFaceClk({ country, certificate });
  };

  const getRequireMessage = (fieldName: string) => {
    const requireText = $i18n['AEPAY_MERCHANT_WALLET.page.fund-manage.autoTransfer.step1.Required'];

    if (locale !== 'zh_CN') {
      return `${fieldName} ${requireText}`;
    } else {
      return `${fieldName}${requireText}`;
    }
  }

  return (
    <div className={classExprRaw`realId`}>
      {
        !onlyShowFace && (
          <div className={classExprRaw`tip`}>{$i18n['ekyc.face.tip']}</div>
        )
      }
      <Form field={field}>
        <Form.Item
          label={$i18n['ekyc.face.country']}
          name="country"
          hidden={onlyShowFace}
          required
          requiredMessage={getRequireMessage($i18n['ekyc.face.country'])}
          {...(fieldProps.country || {})}
        >
          <Select
            style={{ width: '100%' }}
            dataSource={countryList}
            showSearch
            state={countryListLoading ? 'loading' : undefined}
            valueRender={(item) => {
              if (countryList.length) {
                const currentCountry = countryList.find(c => c.value === item.value);

                if (currentCountry) {
                  return currentCountry.label;
                } else {
                  field.setValue('country', undefined);
                }
              }

              return null;
            }}
            onChange={(v) => {
              cancel(); // 取消轮询
              field.setValue('certificate', undefined);
              mutate({});
            }}
          />
        </Form.Item>
        <Form.Item
          label={$i18n['ekyc.face.certificate']}
          name="certificate"
          hidden={onlyShowFace}
          required
          requiredMessage={getRequireMessage($i18n['ekyc.face.certificate'])}
          {...(fieldProps.certificate || {})}
        >
          <Select
            style={{ width: '100%' }}
            dataSource={certificationList}
            showSearch
            state={certificationListLoading ? 'loading' : undefined}
            valueRender={(item) => {
              if (certificationList.length) {
                const currentCertificate = certificationList.find(c => c.value === item.value);
                if (currentCertificate) {
                  return item.label;
                } else {
                  field.setValue('certificate', undefined);
                }
              }

              return null;
            }}
            onChange={() => {
              setShowResetBtn(false);
              mutate({});
            }}
          />
        </Form.Item>
        {
          !!data.url && (
            <Form.Item
              label={$i18n['ekyc.face.realPersonVerification']}
              required
              className={classExprRaw`auth`}
            >
              <div
                className={classExprRaw`authInfo`}
                dangerouslySetInnerHTML={{
                  __html: ($i18n.get({ id: 'ekyc.face.authInfo', placeholderValues: [data.timeoutMinutes] }) || '').replace(/\n/g, '<br />').replace(/\\n/g, '<br />')
                }}
              />
              <div className={classExprRaw`qrcode`}>
                <QRCode value={data.url} renderAs="canvas" size={200} />
                {
                  showResetBtn && (
                    <div className={classExprRaw`reset`}>
                      <Button onClick={onReset}>{$i18n['ekyc.face.resetBtnText']}</Button>
                    </div>
                  )
                }
              </div>
            </Form.Item>
          )
        }
      </Form>
      <Dialog
        v2
        title={$i18n['ekyc.face.verifyErrorTitle']}
        visible={visible}
        onOk={() => setVisible(false)}
        onClose={() => setVisible(false)}
        className={classExprRaw`pendingDialog`}
        width={400}
        footerActions={['cancel', 'ok']}
        closeMode={[]}
        cancelProps={{
          children: $i18n['ekyc.face.retryBtnText'],
          onClick: async () => {
            try {
              // 点击重试时再查询一次结果（手机端超时重试），如果为成功或者失败直接跳转；反之重新刷新二维码，再次轮询
              if (data?.facialScanFlowId) {
                const mtopConfig = getMtopConfigByTenant(tenant);

                const res = await mtop({
                  url: API.queryResult,
                  data: {
                    facialScanFlowId: data.facialScanFlowId
                  },
                  ...mtopConfig
                });

                const status = res?.data?.data?.status;
                if (status === RecognitionStatus.FAILURE || status === RecognitionStatus.SUCCESS) {
                  onCallback({
                    status,
                    redirect: true,
                    facialScanApplyId,
                    country,
                    certificate,
                    faceRecognitionId: res.faceRecognitionId
                  });

                  return;
                }
              }
              refresh();
              resetTime();

              logger.current.retryClk({ country, certificate });
            } catch (error) {
              refresh();
              resetTime();

              logger.current.retryClk({ country, certificate });
            }
          }
        }}
        okProps={{
          children: $i18n['ekyc.face.uploadBtnText'],
          onClick: () => {
            onCallback({
              country,
              certificate,
              redirect: true,
              facialScanApplyId,
              status: RecognitionStatus.FAILURE
            });

            logger.current.uploadClk({ country, certificate });
          }
        }}
      >
        <div className={classExprRaw`pendText`}>{$i18n['ekyc.face.downgradeText']}</div>
      </Dialog>

      <Dialog
        v2
        title={false}
        visible={pending}
        className={classExprRaw`pendingDialog`}
        width={400}
        footerActions={[]}
        closeMode={[]}
      >
        <Loading visible />
        <div className={classExprRaw`pendText`}>{$i18n['ekyc.face.pendingText']}</div>
      </Dialog>
    </div>
  );
}

export default FaceRecognition;
