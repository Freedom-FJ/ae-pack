import React, { useMemo } from 'react';
import CopyText from '../copy-text';
import { classExprRaw } from '../utils';
import { IBaseComponent } from '../interface';
import useLocale from '../locale';
import './index.scss';
import Image from '../image';

interface IProduct {
  skuId: string;
  skuDesc: string;
  productId: string;
  productImg: string;
  productName: string;
  productTitle: string;
  productUrl: string;
  previewImageUrl?: string;
}

export interface IProductInfo extends IBaseComponent {
  data: Partial<IProduct>;
  hiddenSKUDesc?: boolean;
  idLabel?: string;
  skuLabel?: string;
  onImageClick?: () => void;
  onClick?: () => void;
}

function ProductInfo({
  style,
  className = '',
  data,
  hiddenSKUDesc,
  idLabel,
  skuLabel,
  onImageClick,
  onClick,
}: IProductInfo) {
  const {
    productId,
    productUrl,
    productImg = productUrl,
    previewImageUrl,
    skuId,
    skuDesc = skuId,
    productTitle,
    productName = productTitle,
  } = data || {};
  const $i18n = useLocale();

  if (!productName) {
    return null;
  }
  const imgUrl = useMemo(() => {
    if (productImg && !productImg.startsWith('http')) {
      return `//ae04.alicdn.com/kf/${productImg}`;
    }

    return productImg || '';
  }, [productImg]);

  return (
    <div className={`${classExprRaw`product`} ${className}`} style={style}>
      <Image
        className={classExprRaw`product-img`}
        rootClassName={classExprRaw`product-img-root`}
        src={imgUrl}
        previewText=""
        previewUrl={previewImageUrl}
        onClick={onImageClick}
      />
      <div className={classExprRaw`product-info`}>
        <div className={classExprRaw`product-title`} title={productName} onClick={onClick}>
          {productName}
        </div>
        <div className={classExprRaw`product-desc`} title={productId}>
          <CopyText
            ellipsis
            className={classExprRaw`product-copy-text`}
            innerBefore={`${idLabel || $i18n['aepayui.ProductInfo.GoodsID']}: `}
            text={productId}
          />
        </div>
        {!hiddenSKUDesc && (
          <div className={classExprRaw`product-desc`} title={skuDesc}>
            <CopyText
              ellipsis
              className={classExprRaw`product-copy-text`}
              innerBefore={`${skuLabel || $i18n['aepayui.ProductInfo.SKUCode']}: `}
              text={skuDesc}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(ProductInfo);
