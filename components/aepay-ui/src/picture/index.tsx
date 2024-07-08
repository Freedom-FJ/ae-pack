import React from 'react';
import { Balloon } from '@alifd/next';
import Image from '../image';

interface IPicture {
  url?: string;
  previewUrl?: string;
  className?: string;
  onClick?: () => void;
}

function Picture(props: IPicture) {
  const { url, previewUrl, onClick, className = '' } = props;
  if (!url) return null;

  const onImgClick = () => {
    if (onClick) {
      onClick();
    } else {
      Image.showAlbum({ items: [previewUrl || url] });
    }
  };

  return (
    <Balloon
      trigger={<img className={className} src={url} onClick={onImgClick} />}
      triggerType={['hover']}
      alignEdge
      align="lt"
      v2
      autoAdjust
      closable={false}
    >
      <img src={previewUrl || url} style={{ width: 220 }} />
    </Balloon>
  );
}

export default React.memo(Picture);
