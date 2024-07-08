import React from 'react';
import { useTitle } from '@ali/aepay-hooks';

export default () => {
  useTitle('Page Title');

  return (
    <div>
      <p>Set title of the page.</p>
    </div>
  );
};
