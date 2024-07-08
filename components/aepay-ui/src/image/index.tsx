import * as React from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import RcImage from 'rc-image';
import type { ImageProps as RCImageProps } from 'rc-image';
import PreviewGroup, { icons } from './PreviewGroup';
import { classExprRaw } from '../utils';
import popupRender, { instanceProps } from '../popupRender';
import './index.scss';

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup;
  showAlbum: (props: { items: string[]; current?: number }) => void;
}

interface ImageProps extends RCImageProps {
  previewUrl?: string;
  previewText?: string;
}

const Image: CompositionImage<ImageProps & { previewUrl?: string }> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    preview,
    className,
    rootClassName,
    style,
    previewUrl,
    previewText = 'Preview',
    ...otherProps
  } = props;

  const mergedPreview = React.useMemo<ImageProps['preview']>(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === 'object' ? preview : {};
    const { getContainer, closeIcon, ...restPreviewProps } = _preview;
    return {
      mask: (
        <div className={classExprRaw`image-mask-info`}>
          <EyeOutlined rev="" />
          {previewText && <span>{previewText}</span>}
        </div>
      ),
      icons,
      ...restPreviewProps,
      getContainer: getContainer ?? document.body,
      transitionName: classExprRaw`image-zoom`,
      maskTransitionName: classExprRaw`image-fade`,
      focusTriggerAfterClose: true,
      destroyOnClose: true,
      zIndex: 1000,
      closeIcon: closeIcon,
      src: previewUrl || props.src?.replace(/\.(jpg|webp)(_(\d+)x(\d+).*)/, '.$1'),
    };
  }, [preview]);

  return (
    <RcImage
      prefixCls={classExprRaw`image`}
      preview={mergedPreview}
      rootClassName={`${rootClassName} ${classExprRaw`image-root`}`}
      className={`${className} ${classExprRaw`image-base`}`}
      style={style}
      fallback="https://img.alicdn.com/imgextra/i3/O1CN01wK8pkq1qsPKZziHTQ_!!6000000005551-55-tps-60-60.svg"
      {...otherProps}
    />
  );
};

export type { ImageProps };

Image.PreviewGroup = PreviewGroup;

Image.showAlbum = (props: any) => {
  const { items = [], current = 0 } = props || {};
  if (!items.length || current < 0 || current >= items.length) {
    return null;
  }

  let instance: instanceProps = {};

  function hide() {
    return instance ? instance.destroy?.({ preview: { visible: false } }) : undefined;
  }

  const preview = {
    visible: true,
    current,
    onVisibleChange: hide,
    onChange: (index: number) => {
      instance.update?.({ preview: { ...preview, current: index } });
    }
  };

  instance = popupRender({ preview }, <Image.PreviewGroup items={items} />);

  return hide;
}

export default Image;