import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import RotateLeftOutlined from '@ant-design/icons/RotateLeftOutlined';
import RotateRightOutlined from '@ant-design/icons/RotateRightOutlined';
import SwapOutlined from '@ant-design/icons/SwapOutlined';
import ZoomInOutlined from '@ant-design/icons/ZoomInOutlined';
import ZoomOutOutlined from '@ant-design/icons/ZoomOutOutlined';
import RcImage from 'rc-image';
import type { GroupConsumerProps } from 'rc-image/lib/PreviewGroup';
import { classExprRaw } from '../utils';

export const icons = {
  rotateLeft: <RotateLeftOutlined rev="" />,
  rotateRight: <RotateRightOutlined rev="" />,
  zoomIn: <ZoomInOutlined rev="" />,
  zoomOut: <ZoomOutOutlined rev="" />,
  close: <CloseOutlined rev="" />,
  left: <LeftOutlined rev="" />,
  right: <RightOutlined rev="" />,
  flipX: <SwapOutlined rev="" />,
  flipY: <SwapOutlined rev="" rotate={90} />,
};

const InternalPreviewGroup: React.FC<GroupConsumerProps> = ({
  previewPrefixCls: customizePrefixCls,
  preview,
  ...otherProps
}) => {
  const mergedPreview = React.useMemo<GroupConsumerProps['preview']>(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === 'object' ? preview : {};

    return {
      ..._preview,
      transitionName: classExprRaw`image-zoom`,
      maskTransitionName: classExprRaw`image-fade`,
      rootClassName: classExprRaw`image`,
      zIndex: 1000,
    };
  }, [preview]);

  return (
    <RcImage.PreviewGroup
      preview={mergedPreview}
      previewPrefixCls={classExprRaw`image-preview`}
      icons={icons}
      {...otherProps}
    />
  )
};

export default InternalPreviewGroup;
