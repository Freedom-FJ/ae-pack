import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const destroyList: Array<() => void> = [];

export interface instanceProps {
  destroy?: (props?: any) => void;
  destroyAll?: () => void;
  update?: (value: any) => void;
  autoDestroy?: boolean;
  [key: string]: any;
}

export default function popupFunc(config: any, element: React.ReactElement) {
  const { autoDestroy = false } = config;
  let instance: instanceProps = {};

  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig: any = { ...config, close, visible: true };

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    for (let i = 0; i < destroyList.length; i++) {
      const fn = destroyList[i];
      if (fn === close) {
        destroyList.splice(i, 1);
        break;
      }
    }
  }

  function render(props: typeof element) {
    ReactDOM.render(React.cloneElement(element, { ...props }), div);
  }

  function close(closeProps: any = {}) {
    currentConfig = {
      ...currentConfig,
      ...closeProps,
      visible: false,
      afterClose: () => {
        config?.afterClose?.();
        !autoDestroy && destroy();
      },
    };

    render(currentConfig);
    autoDestroy && destroy();
  }

  function update(configUpdate: typeof element) {
    render({
      ...currentConfig,
      ...configUpdate,
    });
  }

  function destroyAll() {
    while (destroyList.length) {
      const close = destroyList.pop();
      if (close) {
        close();
      }
    }
  }

  render(currentConfig);

  destroyList.push(close);

  instance = {
    ...instance,
    destroy: close,
    update,
    destroyAll,
  };

  return instance;
}
