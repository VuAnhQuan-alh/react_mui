import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import { ChangeEvent } from 'react';
import type { IProTablePaginationProps } from './types';

const ProTablePagination = (props: IProTablePaginationProps) => {
  const { page, pageSize, total, onPageChange, onPageSizeChange, rowsPerPageOptions = [10, 25, 50, 100] } = props;

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };
  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    onPageSizeChange(+event.target.value);
    onPageChange(1);
  };

  const pageCount = Math.ceil(total / pageSize);

  return (
    <Box
      sx={{
        p: 1.5,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1.5,
        alignItems: 'center',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={1.5}>
        <Box display="flex" alignItems="center">
          <Typography>Number record:</Typography>

          <FormControl>
            <Select<number>
              size="small"
              variant="standard"
              onChange={handlePageSizeChange}
              value={pageSize}
              MenuProps={{
                MenuListProps: { dense: true },
              }}
              disableUnderline
              sx={{
                [`& .${selectClasses.select}`]: {
                  display: 'flex',
                  alignItems: 'center',
                  pb: 0,
                  ml: 2,
                },
              }}
            >
              {rowsPerPageOptions.map((row) => (
                <MenuItem key={row} value={row}>
                  <Typography>{row}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Pagination
        shape="rounded"
        showFirstButton
        showLastButton
        size="small"
        count={pageCount}
        page={page}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default ProTablePagination;
