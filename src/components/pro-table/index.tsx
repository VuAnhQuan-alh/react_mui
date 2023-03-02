import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

import ProFormProvider from '../pro-form/ProFormProvider';
import useScrollbar from '@/hooks/useScrollbar';
import { ReactNode, useRef, useState } from 'react';
import {
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnPinningState,
} from '@tanstack/react-table';
import type { IProColumn, IProTablePaginationProps } from './types';

import ProTablePagination from './ProTablePagination';
import { UseFormReturn } from 'react-hook-form';
import LoadingOverlay from './core/LoadingOverlay';
import NoRowOverlay from './core/NoRowOverlay';
import ProTableCell from './ProTableCell';
import VisibilityColumns from './core/VisibilityColumns';

interface IProps<T> {
  pagination: IProTablePaginationProps;
  toolBar?: ReactNode;
  filter?: ReactNode;
  title: string;
  loading: boolean;
  form?: UseFormReturn<any, any>;
  data: T[];
  columns: IProColumn<T>;
  hiddenVisibilityColumns?: boolean;
  hiddenFiltersActions?: boolean;
}

const ProTable = <T extends object>(props: IProps<T>) => {
  const {
    toolBar,
    hiddenFiltersActions,
    hiddenVisibilityColumns,
    filter,
    pagination,
    title,
    loading,
    data,
    form,
    columns,
  } = props;

  const { page, pageSize, total, onPageChange, onPageSizeChange } = pagination;

  const scrollbar = useScrollbar();
  const containerRef = useRef<HTMLDivElement>(null);
  const [stickyHeader] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ['index'],
    right: ['actions'],
  });

  const handleExpandCollapse = () => setCollapsed(!collapsed);

  const table = useReactTable({
    data: data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
    },
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  const { getHeaderGroups, getRowModel } = table;

  return (
    <Paper elevation={2} sx={{ display: 'grid', gridTemplateRows: 'auto auto minmax(0, 1fr) auto' }}>
      <Collapse in={collapsed} timeout="auto">
        {filter}
      </Collapse>

      <Box px={2} py={1} display="flex" alignItems="center" gap={2}>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {toolBar && (
          <Stack direction="row" gap={1}>
            {toolBar}
          </Stack>
        )}

        {!hiddenFiltersActions && !hiddenVisibilityColumns && (
          <Stack direction="row" gap={1}>
            {!hiddenVisibilityColumns && <VisibilityColumns table={table} />}

            {!hiddenFiltersActions && (
              <Tooltip title="Toggle filters">
                <IconButton onClick={handleExpandCollapse}>
                  {!collapsed ? <FilterListIcon /> : <FilterListOffIcon />}
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        )}
      </Box>

      <ProFormProvider form={form}>
        <TableContainer
          ref={containerRef}
          sx={{
            border: 1,
            overflow: 'auto',
            borderColor: 'divider',
            ...scrollbar,
          }}
        >
          <LoadingOverlay visible={loading} />
          <NoRowOverlay visible={!loading && total === 0} />

          <Table
            stickyHeader={stickyHeader}
            size="small"
            sx={{
              minWidth: 'max-content',
              minHeight: total !== 0 ? 'max-content' : 420,
            }}
          >
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const { align } = header.column.columnDef.meta || {};
                    const offset = header.getStart();

                    return (
                      <ProTableCell
                        key={header.id}
                        offset={offset}
                        cellHeader
                        align={align}
                        fixed={header.column.getIsPinned()}
                        sx={{ py: 2 }}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </ProTableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {getRowModel().rows.map((row) => (
                <TableRow key={row.id} hover tabIndex={-1}>
                  {row.getVisibleCells().map((cell) => {
                    const offset = cell.column.getStart();
                    const fixed = cell.column.getIsPinned();
                    const { align } = cell.column.columnDef.meta || {};

                    return (
                      <ProTableCell key={cell.id} align={align} fixed={fixed} offset={offset}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </ProTableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ProFormProvider>

      <ProTablePagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
      />
    </Paper>
  );
};

export default ProTable;
