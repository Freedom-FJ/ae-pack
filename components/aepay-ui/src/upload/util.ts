import { mineMap, IconMap, ONE_KB, ONE_MB } from "./contant";
import { IFileExt, IUploadFile } from "./interface";

/** 加载图片 */
export async function loadImage(url?: string): Promise<string> {
  if (!url) return Promise.reject();

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onerror = (ex) => {
      reject(ex);
    };

    img.onload = () => {
      resolve(url);
    };
  });
}

const extname = (url: string = '') => {
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};


export const isImageFileType = (type: string): boolean => type.indexOf('image/') === 0;

export const isImageUrl = (file: IUploadFile): boolean => {
  if (file.type && !file.imgURL) {
    return isImageFileType(file.type);
  }
  const url: string = (file.imgURL || file.url || '') as string;
  const extension = extname(url);
  if (
    /^data:image\//.test(url) ||
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico|heic|heif)$/i.test(extension)
  ) {
    return true;
  }
  if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  }
  if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
};

const MEASURE_SIZE = 200;
export function previewImage(file: File | Blob): Promise<string> {
  return new Promise((resolve) => {
    if (!file.type || !isImageFileType(file.type)) {
      resolve('');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      let drawWidth = MEASURE_SIZE;
      let drawHeight = MEASURE_SIZE;
      let offsetX = 0;
      let offsetY = 0;

      if (width > height) {
        drawHeight = height * (MEASURE_SIZE / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (MEASURE_SIZE / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx!.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      window.URL.revokeObjectURL(img.src);
      resolve(dataURL);
    };
    img.crossOrigin = 'anonymous';
    if (file.type.startsWith('image/svg+xml')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('image/gif')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      img.src = window.URL.createObjectURL(file);
    }
  });
}

// 计算当前总的文件大小
export function getFileTotalSize(fileList: File[]) {
  return fileList.filter(Boolean).reduce((totalSize, file) => totalSize += Number(file.size || 0), 0)
};

export function formatSize(sizeByte: number) {
  if (sizeByte > ONE_MB) {
    return (sizeByte / ONE_MB).toFixed(1).concat('M');
  } else if (sizeByte > ONE_KB) {
    return (sizeByte / ONE_KB).toFixed(1).concat('KB');
  } else {
    return sizeByte.toFixed(1).concat('B');
  }
}

export const updateThumbUrl = async (file: File & { thumbUrl: string; }) => {
  switch (file.type) {
    case mineMap.PDF: {
      file.thumbUrl = IconMap.PDF;
      break;
    }
    case mineMap.CSV: {
      file.thumbUrl = IconMap.CSV;
      break;
    }
    case mineMap.XLS: 
    case mineMap.XLSX: {
      file.thumbUrl = IconMap.EXCEL;
      break;
    }
    case mineMap.DOC: 
    case mineMap.DOCX: {
      file.thumbUrl = IconMap.WORD;
      break;
    }
    case mineMap.TIF: 
    case mineMap.JPEG:
    case mineMap.JPG:
    case mineMap.PNG: {
      // const thumbUrl = await previewImage(file);
      file.thumbUrl =  URL.createObjectURL(file); // thumbUrl;
      break;
    }
    default: {
      file.thumbUrl = IconMap.UNKONW;
      break;
    }
  }
}

export function getAllowFileType(accept: IFileExt[] = []) {
  return accept
    .map((item: string) => {
      const key = item.trim().toUpperCase().slice(1);
      return mineMap[key] as string;
    })
    .filter(Boolean);
}