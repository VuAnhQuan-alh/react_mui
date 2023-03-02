import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import { useState, MouseEvent } from 'react';
import type { Table, Column } from '@tanstack/react-table';

interface IProps<T> {
  table: Table<T>;
}

const VisibilityColumns = <T extends object>(props: IProps<T>) => {
  const { table } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <>
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
        <MenuItem sx={{ px: 3 }}>
          <FormControlLabel
            label={<Typography sx={{ ml: 1, width: '100%' }}>View all columns</Typography>}
            control={
              <Checkbox
                checked={table.getIsAllColumnsVisible()}
                onChange={table.getToggleAllColumnsVisibilityHandler()}
              />
            }
          />
        </MenuItem>

        <Divider />

        {table.getAllLeafColumns().map((column: Column<T, unknown>) => {
          const { title } = column.columnDef.meta || {};
          return (
            <MenuItem key={column.id} sx={{ px: 3 }}>
              <FormControlLabel
                label={<Typography sx={{ ml: 1, width: '100%' }}>{title}</Typography>}
                control={<Checkbox checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()} />}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default VisibilityColumns;
