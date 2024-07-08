import React, { useState } from 'react';
import { useTable } from '@ali/aepay-hooks';
import { Button, Pagination } from '@alifd/next';

export default () => {
  const [params, setParams] = useState({});
  const { onQuery, pagination } = useTable({
    onSearch: (params: any) => {
      setParams(params);
    },
  });

  return (
    <div>
      <div>查询参数: {JSON.stringify(params)}</div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
        <Pagination {...pagination} />
        <Button style={{ marginLeft: 16 }} onClick={() => onQuery({ type: 'test' })}>查询</Button>
      </div>
    </div>
  );
};