import Box from '@mui/material/Box';
import ProTable from '@/components/pro-table';
import { Fragment, useEffect, useRef, useState } from 'react';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import { useFilters } from './utils/filters';
import ActionButton from '@/components/pro-button/ActionButton';
import type { FiltersRef } from '@/components/pro-table/types';
import { Await } from '@/hooks/useAwait';
import useProfiles from '@/hooks/useProfiles';

const UsersManage = () => {
  const { list, meta, filtersProfile } = useProfiles();
  const { page, pageSize, total } = meta;

  const [loading, setLoading] = useState<boolean>(false);
  const filterRef = useRef<FiltersRef | null>(null);

  const { filters, onPageChange, onPageSizeChange, onSearch } = useFilters();
  const { columns } = useTableColumns({ page, pageSize });

  const handleSearch = () => {
    setLoading(true);
    Await(1000).finally(() => {
      filterRef.current?.submit({});
      setLoading(false);
    });
  };

  const handleCancel = () => {
    filterRef.current?.reset();
  };

  useEffect(() => {
    filtersProfile(filters);
    // eslint-disable-next-line
  }, [filters]);

  return (
    <Box my="62px">
      <ProTable
        // ref={tableRef}
        title="Person list:"
        loading={loading}
        filter={<FiltersForm onSearch={onSearch} ref={filterRef} />}
        pagination={{ page, pageSize, onPageChange, onPageSizeChange, total }}
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
