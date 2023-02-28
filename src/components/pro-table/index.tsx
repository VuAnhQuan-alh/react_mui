import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FormControlLabel from '@mui/material/FormControlLabel';

import ProFormProvider from '../pro-form/ProFormProvider';
import useScrollbar from '@/hooks/useScrollbar';
import { MouseEvent, useRef, useState } from 'react';
import {
  type Column,
  ColumnOrderState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ProColumn } from './types';

type Person = {
  fullName: string;
  age: number;
  visits: number;
  status: boolean;
};

const defaultData: Person[] = [
  {
    fullName: 'Ho Thu Huyen',
    age: 18,
    visits: 2049,
    status: true,
  },
  {
    fullName: 'Tran Ngoc Tu',
    age: 22,
    visits: 2089,
    status: true,
  },
  {
    fullName: 'Nguyen Dieu Linh',
    age: 20,
    visits: 2059,
    status: false,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns: ProColumn<Person> = [
  columnHelper.accessor('fullName', {
    cell: (info) => info.getValue(),
    header: () => <span>Full name</span>,
    meta: {
      title: 'Full name',
    },
  }),
  columnHelper.accessor('age', {
    cell: (info) => info.getValue(),
    header: () => <span>Age</span>,
    meta: {
      title: 'Age',
    },
  }),
  columnHelper.accessor('visits', {
    cell: (info) => info.getValue(),
    header: () => <span>Visits</span>,
    meta: {
      title: 'Visits',
    },
  }),
  columnHelper.accessor('status', {
    cell: (info) => (info.getValue() ? 'Single' : 'In Relationship'),
    header: () => <span>Status</span>,
    meta: {
      title: 'Status',
    },
  }),
];

const ProTable = () => {
  const scrollbar = useScrollbar();
  const containerRef = useRef<HTMLDivElement>(null);
  const [stickyHeader] = useState<boolean>(true);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => setAnchorEl(null);

  const [data] = useState<Person[]>(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    // debugTable: true,
    // debugColumns: true,
    // debugHeaders: true,
  });

  const {
    getHeaderGroups,
    getRowModel,
    getIsAllColumnsVisible,
    getToggleAllColumnsVisibilityHandler,
    getAllLeafColumns,
  } = table;

  return (
    <Paper elevation={2} sx={{ display: 'grid', gridTemplateRows: 'auto auto minmax(0, 1fr) auto', height: 1, m: 2 }}>
      <Box px={2} py={1} display="flex" alignItems="center">
        <Box>
          <Typography variant="h6">My ex&apos;s:</Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack>
          <Tooltip title="Select columns">
            <IconButton
              id="basic-icon-button"
              aria-controls={openMenu ? 'menu-visible' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleOpenMenu}
            >
              <ViewColumnIcon />
            </IconButton>
          </Tooltip>

          <Menu
            open={openMenu}
            id="menu-visible"
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
            MenuListProps={{ 'aria-labelledby': 'basic-icon-button' }}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'bottom',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem>
              <FormControlLabel
                label={<Typography sx={{ ml: 1, width: '100%' }}>View all columns</Typography>}
                control={
                  <Checkbox checked={getIsAllColumnsVisible()} onChange={getToggleAllColumnsVisibilityHandler()} />
                }
              />
            </MenuItem>

            <Divider />

            {getAllLeafColumns().map((column: Column<Person, unknown>) => {
              const { title } = column.columnDef.meta || {};
              return (
                <MenuItem key={column.id}>
                  <FormControlLabel
                    label={<Typography sx={{ ml: 1, width: '100%' }}>{title}</Typography>}
                    control={
                      <Checkbox checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()} />
                    }
                  />
                </MenuItem>
              );
            })}
          </Menu>
        </Stack>
      </Box>

      <ProFormProvider>
        <TableContainer
          ref={containerRef}
          sx={{
            overflow: 'auto',
            borderColor: 'divider',
            // position: 'relative',
            ...scrollbar,
          }}
        >
          {/* <LoadingOverlay visible={loading} /> */}

          <Table
            stickyHeader={stickyHeader}
            size="small"
            sx={{
              minWidth: 'max-content',
              minHeight: 'max-content',
              // position: 'absolute',
              // inset: 0,
            }}
          >
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // console.log(header);
                    return (
                      <TableCell key={header.id} sx={{ backgroundColor: 'gray.200' }}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ProFormProvider>
    </Paper>
  );
};

export default ProTable;
