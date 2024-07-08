import FaceRecognition from './real-id';
import FaceRecognitionDialog, { type FaceRecognitionDialogProps } from './real-id/dialog';
import FaceRecognitionSDK from './real-id/sdk';
import { type FaceRecognitionProps, type ICallbackOptions } from './real-id/interface';

export default FaceRecognition;

export { 
  FaceRecognitionSDK,
  FaceRecognitionDialog,
  type FaceRecognitionProps,
  type FaceRecognitionDialogProps,
  type ICallbackOptions
};
