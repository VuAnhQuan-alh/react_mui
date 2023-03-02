import ProTable from '@/components/pro-table';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import { useFilters } from './utils/filters';
import type { IPerson } from './utils/type';
import ActionButton from '@/components/pro-button/ActionButton';
import type { FiltersRef } from '@/components/pro-table/types';
import { Await } from '@/hooks/useAwait';
import MOCK_DATA from '@/../../public/mock/MOCK_DATA_2.json';

const UsersManage = () => {
  const DATA = useMemo(() => [...MOCK_DATA], []);
  const [loading, setLoading] = useState<boolean>(false);
  // const [refetch, setRefetch] = useRefetch();
  // const tableRef = useRef<any>(null);
  const filterRef = useRef<FiltersRef | null>(null);
  const [person, setPerson] = useState<IPerson[]>([]);

  const { filters, onPageChange, onPageSizeChange, onSearch } = useFilters();
  const { page, pageSize } = filters;
  const { columns } = useTableColumns({ page, pageSize });

  useEffect(() => {
    setPerson(() => {
      return DATA.slice((filters.page - 1) * filters.pageSize, filters.page * filters.pageSize);
      // return [];
    });
  }, [filters, DATA]);

  const handleSearch = () => {
    setLoading(true);
    filterRef.current?.submit({});
    Await(1000).finally(() => {
      console.log('fil');
      setLoading(false);
    });
  };

  const handleCancel = () => {
    filterRef.current?.reset();
  };

  return (
    <ProTable
      // ref={tableRef}
      title="Person list:"
      loading={loading}
      filter={<FiltersForm onSearch={onSearch} ref={filterRef} />}
      pagination={{ page, pageSize, onPageChange, onPageSizeChange, total: person.length }}
      data={person}
      columns={columns}
      toolBar={
        <Fragment>
          <ActionButton variant="text" onClick={handleCancel}>
            Cancel
          </ActionButton>
          <ActionButton actionType="search" onClick={handleSearch}>
            Search
          </ActionButton>
        </Fragment>
      }
    />
  );
};

export default UsersManage;
