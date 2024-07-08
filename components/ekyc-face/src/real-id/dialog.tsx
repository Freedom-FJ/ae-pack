import React from "react";
import { Dialog } from "@alifd/next";
import FaceRecognition, { FaceRecognitionProps } from ".";
import { classExprRaw } from "../utils";

export interface FaceRecognitionDialogProps extends FaceRecognitionProps {
  // 是否显示
  visible?: boolean;
  // 标题
  title?: string;
  // 关闭事件
  onClose?: () => void;
}

export default function FaceRecognitionDialog({ title, visible, onClose, ...faceProps }: FaceRecognitionDialogProps) {
  return (
    <Dialog
      v2
      title={title || '人脸识别'}
      visible={visible}
      onOk={onClose}
      onClose={onClose}
      className={classExprRaw`dialog`}
    >
      <FaceRecognition {...faceProps} />
    </Dialog>
  );
}