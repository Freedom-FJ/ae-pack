import React, { useMemo, useRef } from 'react';
import { classExprRaw } from '../utils';
import './index.scss';
import { IFileData, IUploadFile, IUploaderProps } from './interface';
import { Button, Dialog, Icon, Upload } from '@alifd/next';
import { formatSize, getAllowFileType, getFileTotalSize, isImageUrl, updateThumbUrl } from './util';
import { ONE_KB, ONE_MB } from './contant';
import useLocale from '../locale';
import Image from '../image';

function Uploader(props: IUploaderProps, ref: any) {
  const $i18n = useLocale();

  const {
    style,
    placeholder = $i18n['aepayui.Uploader.UploadFiles'],
    tipPlacement,
    renderTip,
    disabled,
    multiple,
    accept = ['.jpg', '.jpeg', '.png'],
    value,
    isPreview,
    hiddenDownload,
    customRequest,
    onAbort,
    onProgress,
    onChange,
    onRemove = () => true,
    listType = 'text',
    btnType = 'primary',
    limit = 5,
    className = '',
    uploaderCount = 1,
    maxSize = 5 * ONE_MB,
    minSize = 10 * ONE_KB,
    allMaxSize = 60 * ONE_MB,
  } = props;

  const allowFileType = useMemo(() => getAllowFileType(accept), [accept]);
  const uploaderRef = useRef(null);

  // 预览图片
  const handlePreview = async (file?: any) => {
    try {
      const items = value.filter(Boolean);
      const current = items.findIndex(item => item.name === file.name && item.url === file.url);

      Image.showAlbum({
        items: items.map(item => item.url),
        current
      })
    } catch (e) {
      console.error(e);
    }
  };

  const handleBeforeUpload = async (file: File) => {
    await updateThumbUrl(file as any);
    console.log('handleBeforeUpload...', file);

    // 文件格式校验
    if (!allowFileType.includes(file.type)) {
      return Promise.reject(
        new Error(
          $i18n.get({
            id: 'aepayui.Uploader.FileFormatAccept',
            placeholderValues: {
              accept: accept.join(', '),
              maxSize: `${maxSize / ONE_MB}M`,
              limit,
            }
          }),
        ),
      );
    }

    // 单文件最大值
    if (maxSize && file.size > maxSize) {
      return Promise.reject(
        new Error(
          $i18n.get({
            id: 'aepayui.Uploader.UpToMaxsizeCurrentImage',
            placeholderValues: {
              maxSize: formatSize(maxSize),
              currentSize: formatSize(file.size)
            }
          })
        ),
      );
    }

    // 单文件最小值
    if (minSize && file.size < minSize) {
      return Promise.reject(
        new Error(
          $i18n.get({
            id: 'aepayui.Uploader.TheMinimumValueIsMinsize',
            placeholderValues: {
              minSize: formatSize(minSize),
              currentSize: formatSize(file.size)
            }
          })
        ),
      );
    }

    // 所有文件最大值
    const allFileSizes = getFileTotalSize((value || []).concat([file]));
    if (allMaxSize && allFileSizes > allMaxSize) {
      return Promise.reject(
        new Error(
          $i18n.get({
            id: 'aepayui.Uploader.AllMaxFileSize',
            placeholderValues: {
              maxSize: formatSize(allMaxSize),
              currentSize: formatSize(allFileSizes)
            }
          })
        ),
      );
    }

    return file;
  }

  const handleError = (item: IUploadFile) => {
    Dialog.error({
      v2: true,
      width: 416,
      centered: true,
      title: $i18n['aepayui.Uploader.UploadFailed'],
      content: item.error?.message || 'upload failed!',
    });
  }

  const handleProgress = () => {
    onProgress?.();
  }

  // 模拟blur原生事件
  const handleBlur = () => {
    const inputList = uploaderRef.current?.querySelectorAll('input');
    if (!inputList?.length) return;
    setTimeout(() => {
      inputList[0].dispatchEvent(new Event('blur'));
    });
  };

  const handleChange = (files: File[], index: number) => {
    let _files = [...files];
    if (uploaderCount > 1 && files.length < uploaderCount) {
      _files = new Array(uploaderCount).fill(null).map((file, i) => {
        if (i === index) {
          return files[0];
        }

        return value?.[i] || null;
      });
    }

    // 仅回调成功文件
    _files = _files.filter((item: any) => item?.state === 'done')
      .map((item: any) => {
        if (item) {
          const name = item.response?.fileName || item.fileName || item.response?.name || item.name;
          return {
            ...item,
            name,
            fileName: name,
            url: item.response?.url || item.url,
          };
        }

        return item;
      });

    onChange?.(_files);

    handleBlur();
  }

  const itemRender = (file: any, { remove }: { remove?: () => void }) => {
    const isImg = isImageUrl(file);
    const downloadURL = file.downloadURL || file.url;

    return (
      <div className="next-upload-render">
        <img
          src={file.url || file.originFileObj?.thumbUrl || 'unknown'}
          onClick={() => isImg && handlePreview(file)}
          style={{ maxWidth: '100%', maxHeight: '100%', cursor: isImg ? 'pointer' : undefined }}
        />
        {!disabled && (
          <div className="next-upload-tool">
            {
              !hiddenDownload && (
                <a
                  href={downloadURL}
                  data-spm-protocol="i"
                  target="_blank"
                  download
                  className="next-upload-tool-item next-upload-tool-download-link"
                  rel="noreferrer"
                >
                  <Icon size="medium" type="download" />
                </a>
              )
            }
            {
              !isPreview && (
                <span className="next-upload-tool-item next-upload-tool-close">
                  <Icon size="medium" onClick={() => remove?.()} type="ashbin" />
                </span>
              )
            }
          </div>
        )}
      </div>
    );
  };

  const handleRequest = (option: any) => {
    customRequest(option).then((data: any) => {
      option.onSuccess({
        url: data?.url,
        filename: data?.filename,
        name: option.file?.name || data?.name || data?.filename,
      });
    }).catch((err: any) => {
      option.onError(err);
    });

    return {
      abort: (f: File) => {
        onAbort?.(f);
      }
    }
  }

  const formatter = (response: IFileData) => {
    console.log('formatter....', response);
    const success = !!response?.url;
    return {
      success,
      message: success ? $i18n['aepayui.Uploader.UploadSuccess'] : $i18n['aepayui.Uploader.UploadFailed'],
      url: response.url,
      name: response.name || response.fileName || response.filename,
      filename: response.filename
    }
  }

  const getValue = (index: number) => {
    if (uploaderCount > 1) {
      return value?.[index] ? [value[index]] : [];
    } else {
      return value?.map((item: any, index) => ({
        ...item,
        uid: item.uid || `${item.name}_${item.url}_${index}`
      }));
    }
  }

  const renderUploader = () => {
    const uploadProps: any = {
      accept: allowFileType.join(','),
      disabled,
      isPreview,
      formatter,
      multiple,
      limit: uploaderCount > 1 ? 1 : limit,
      request: handleRequest,
      onError: handleError,
      onProgress: handleProgress,
      onPreview: handlePreview,
      onRemove,
      beforeUpload: handleBeforeUpload,
    };

    return new Array(uploaderCount).fill('').map((item, index) => {
      let displayNode: React.ReactNode;
      const btnText = Array.isArray(placeholder) ? placeholder[index] : placeholder;
      if (listType === 'card') {
        displayNode = (
          <Upload.Card
            key={index}
            value={getValue(index)}
            listType="card"
            {...uploadProps}
            itemRender={itemRender}
            onChange={(e) => handleChange(e, index)}
          >
            {btnText}
          </Upload.Card>
        );
      } else {
        displayNode = (
          <Upload
            key={index}
            value={getValue(index)}
            listType={listType}
            {...uploadProps}
            onChange={(e) => handleChange(e, index)}
          >
            <Button type={btnType}>
              {btnText}
            </Button>
          </Upload>
        );
      }
      return displayNode;
    });
  };

  return (
    <div className={`${classExprRaw`uploader ${`uploader-${listType}`}`} ${className}`} style={style} ref={uploaderRef}>
      {tipPlacement === 'top' && renderTip()}
      <div className={classExprRaw`uploader-btn ${uploaderCount > 1 ? 'uploader-muti-btn' : ''}`}>
        {renderUploader()}
      </div>
      {tipPlacement === 'bottom' && renderTip()}
    </div>
  );
}

Uploader.Excel = (props: Omit<IUploaderProps, 'accept' | 'uploaderCount'>) => {
  return <Uploader uploaderCount={1} accept={['.csv', '.xls', '.xlsx']} {...props} />
}

Uploader.Image = (props: Omit<IUploaderProps, 'accept' | 'uploaderCount'>) => {
  return <Uploader uploaderCount={1} accept={['.jpeg', '.jpg', '.png', '.tif']} {...props} />
}

export default Uploader;