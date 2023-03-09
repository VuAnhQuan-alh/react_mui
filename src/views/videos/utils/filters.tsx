import { useState } from 'react';
import { IFiltersParamsVideo } from './type';

export const useFilters = () => {
  const [filters, setFilters] = useState<IFiltersParamsVideo>({
    content: '',
    public: -1,
    from: null,
    to: null,

    sortBy: '',
    sortDirection: '',
    page: 1,
    pageSize: 25,
  });

  const onPageChange = (page: number) => {
    setFilters((state) => ({ ...state, page }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setFilters((state) => ({
      ...state,
      pageSize,
    }));
  };

  const onSearch = (params: Partial<IFiltersParamsVideo>) => {
    setFilters((state) => ({
      ...state,
      ...params,
      page: 1,
    }));
  };

  return { filters, onPageChange, onPageSizeChange, onSearch };
};
