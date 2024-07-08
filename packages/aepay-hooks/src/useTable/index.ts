import { useRef, useState } from 'react';

// 缓存页码大小
const Storagekey = 'aepay-pagesize';

export const useTable = ({
  onSearch = console.log,
  updateUrl = true,
  pageSize: defaultPageSize = Number(localStorage.getItem(Storagekey)) || 10,
  pagination = true,
} = {}) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [queryData, setQueryData] = useState<any>({});
  const reqRef = useRef(1);

  const onQuery = (params: any = {}) => {
    const inFirst = reqRef.current === 1;
    const queryParams = { pageSize, current: inFirst ? page : 1, ...params };
    _onSearch(queryParams);
    setQueryData(params);

    if (!inFirst && !params.current) {
      setPage(1);
    }
  };

  const onPageSizeChange = (size: number) => {
    localStorage.setItem(Storagekey, size.toString());
    _onSearch({ ...queryData, pageSize: size, current: 1 });
    setPageSize(size);
    setPage(1);
  };

  const onPageChange = (index: number) => {
    _onSearch({ ...queryData, pageSize, current: index });
    setPage(index);
  };

  const onRefresh = () => {
    _onSearch({ ...queryData, pageSize, current: page });
  };

  const _onSearch = (query: any) => {
    reqRef.current++;

    if (!pagination) {
      delete query.current;
      delete query.pageSize;
    }

    onSearch(query);
  };

  return {
    queryData,
    onQuery,
    onRefresh,
    pagination: {
      current: page,
      onChange: onPageChange,
      pageSize,
      onPageSizeChange,
    },
  };
};
