import { useState } from 'react';
import { IFiltersParams } from './type';

export const useFilters = () => {
  const [filters, setFilters] = useState<IFiltersParams>({
    query: '',
    date: null,
    role: -1,
    confirmed: -1,
    gender: -1,

    sortBy: '',
    sortDirection: '',
    pageSize: 10,
    page: 1,
  });

  const onPageChange = (page: number) => {
    setFilters((state) => ({
      ...state,
      page,
    }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setFilters((state) => ({
      ...state,
      pageSize,
    }));
  };

  const onSearch = (params: Partial<IFiltersParams>) => {
    setFilters((state) => ({
      ...state,
      ...params,
      page: 1,
    }));
  };

  return { filters, onPageChange, onPageSizeChange, onSearch };
};
