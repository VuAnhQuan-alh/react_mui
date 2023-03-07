import Box from '@mui/material/Box';
import ProTable from '@/components/pro-table';
import { Fragment, useRef, useState } from 'react';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import { useFilters } from './utils/filters';
import ActionButton from '@/components/pro-button/ActionButton';
import type { FiltersRef } from '@/components/pro-table/types';
import { Await } from '@/hooks/useAwait';
import useProfiles from '@/hooks/useProfiles';

const UsersManage = () => {
  const { list } = useProfiles();

  const [loading, setLoading] = useState<boolean>(false);
  const filterRef = useRef<FiltersRef | null>(null);

  const { filters, onPageChange, onPageSizeChange, onSearch } = useFilters();
  const { page, pageSize } = filters;
  const { columns } = useTableColumns({ page, pageSize });

  const handleSearch = () => {
    setLoading(true);
    Await(1000).finally(() => {
      filterRef.current?.submit({});
      setLoading(false);
    });
  };

  console.log(filters);

  const handleCancel = () => {
    filterRef.current?.reset();
  };

  return (
    <Box my="62px">
      <ProTable
        // ref={tableRef}
        title="Person list:"
        loading={loading}
        filter={<FiltersForm onSearch={onSearch} ref={filterRef} />}
        pagination={{ page, pageSize, onPageChange, onPageSizeChange, total: list.length }}
        data={list}
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
    </Box>
  );
};

export default UsersManage;
