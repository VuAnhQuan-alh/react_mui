import Box from '@mui/material/Box';
import { FiltersRef } from '@/components/pro-table/types';
import useVideo from '@/hooks/useVideo';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import useTableColumns from './TableColumns';
import { useFilters } from './utils/filters';
import { Await } from '@/hooks/useAwait';
import ProTable from '@/components/pro-table';
import FiltersForm from './FiltersForm';
import ActionButton from '@/components/pro-button/ActionButton';
import ModalVideo from './ModalVideo';

const VideoManager = () => {
  const { list, meta } = useVideo();
  const { page, pageSize, total } = meta;

  const [loading, setLoading] = useState<boolean>(false);
  const filterRef = useRef<FiltersRef | null>(null);
  const [open, setOpen] = useState<boolean>(false);

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

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleCreateVideo = (data: any) => () => {
    console.log(data);
  };

  useEffect(() => {
    // console.log(filters);
  }, [filters]);

  return (
    <Box my="62px">
      <ProTable
        title="Videos list:"
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

            <ActionButton actionType="add" onClick={handleOpen}>
              Create
            </ActionButton>
          </Fragment>
        }
      />

      <ModalVideo open={open} handleClose={handleClose} handleSubmit={handleCreateVideo} />
    </Box>
  );
};

export default VideoManager;
