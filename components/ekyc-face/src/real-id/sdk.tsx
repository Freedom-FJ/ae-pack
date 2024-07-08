import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FaceRecognitionDialog, { type FaceRecognitionDialogProps } from './dialog';

export interface instanceProps {
  destroy?: () => void;
  close?: () => void;
  update?: (value: any) => void;
  [key: string]: any;
}

function popupFunc(config: FaceRecognitionDialogProps, element: React.ReactElement) {
  let instance: instanceProps = {};

  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig: FaceRecognitionDialogProps = { ...config, onClose: close, visible: true };

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function render(props: FaceRecognitionDialogProps) {
    ReactDOM.render(React.cloneElement(element, { ...props }), div);
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
    };

    render(currentConfig);
  }

  function update(configUpdate: typeof element) {
    render({
      ...currentConfig,
      ...configUpdate,
    });
  }

  render(currentConfig);

  instance = {
    ...instance,
    destroy,
    update,
    close,
  };

  return instance;
}

let instance: any = {};

function show(props?: Omit<FaceRecognitionDialogProps, 'visible' | 'onClose'>) {
  hide();

  instance = popupFunc(props, <FaceRecognitionDialog visible {...props} />);
  return instance;
}

function hide() {
  return instance ? instance.close?.() : undefined;
}

const FaceRecognitionSDK = {
  show,
  hide,
  destroy: () => {
    instance ? instance.destroy?.() : undefined
  },
};

export default FaceRecognitionSDK;