/*
 * @Author: mjh
 * @Date: 2024-05-15 14:18:33
 * @LastEditors: mjh
 * @LastEditTime: 2024-05-15 14:48:03
 * @Description:
 */

import React, { useState } from 'react';
import { CoverText } from '@ali/aepay-ui';

const App: React.FC = () => {
  const [cover, setCover] = useState(true);
  return (<CoverText height={20} value={cover} onChange={setCover}>
    <div>123</div>
    <div>123</div>
    <div>123</div>
    <div>123</div>
  </CoverText>);
};

export default App;