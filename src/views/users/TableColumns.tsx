import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { createColumnHelper } from '@tanstack/react-table';

import Index from '@/components/pro-table/core/Index';
import type { IProColumn, HeadCell } from '@/components/pro-table/types';
import type { IPerson } from './utils/type';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<IPerson>();

const HEAD_CELLS: HeadCell<IPerson> = {
  index: 'STT',

  full_name: 'Full nane',
  email: 'Email',
  gender: 'Gender',
  avatar: 'Avatar',
  date_of_birth: 'Birthday',
  address: 'Address',
  role: 'Permission',
  confirmed: 'Active',

  actions: 'Actions',
};

interface IProps {
  page: number;
  pageSize: number;
}

const useTableColumns = (props: IProps) => {
  const { page, pageSize } = props;

  const columns: IProColumn<IPerson> = useMemo(() => {
    return [
      Index<IPerson>(page, pageSize),

      columnHelper.accessor('full_name', {
        cell: (info) => info.getValue(),
        header: () => <span>Full name</span>,
        meta: {
          title: HEAD_CELLS.full_name,
        },
      }),

      columnHelper.accessor('avatar', {
        cell: (info) => <Avatar src={info.getValue() || void 0} alt="avatar-user" sx={{ width: 40, height: 40 }} />,
        header: () => <span>Avatar</span>,
        meta: {
          title: HEAD_CELLS.avatar,
        },
      }),

      columnHelper.accessor('email', {
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        meta: {
          title: HEAD_CELLS.email,
        },
      }),

      columnHelper.accessor('gender', {
        cell: (info) => info.getValue(),
        header: () => HEAD_CELLS.gender,
        meta: {
          title: HEAD_CELLS.gender,
        },
      }),

      columnHelper.accessor('date_of_birth', {
        cell: (info) => info.getValue(),
        header: () => HEAD_CELLS.date_of_birth,
        meta: {
          title: HEAD_CELLS.date_of_birth,
        },
      }),

      columnHelper.accessor('role', {
        cell: (info) => info.getValue(),
        header: () => HEAD_CELLS.role,
        meta: {
          title: HEAD_CELLS.role,
        },
      }),

      columnHelper.accessor('address', {
        cell: (info) => info.getValue(),
        header: () => HEAD_CELLS.address,
        meta: {
          title: HEAD_CELLS.address,
        },
      }),

      columnHelper.accessor('confirmed', {
        cell: (info) => (info.getValue() ? 'Active' : 'Inactive'),
        header: () => HEAD_CELLS.confirmed,
        meta: {
          title: HEAD_CELLS.confirmed,
        },
      }),

      {
        id: 'actions',
        header: () => <span>Actions</span>,
        cell: () => {
          return (
            <Stack direction="row" justifyContent="space-around">
              <IconButton>
                <VisibilityIcon />
              </IconButton>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Stack>
          );
        },
        meta: {
          title: 'Actions',
          align: 'center',
        },
      },
    ];
  }, [page, pageSize]);

  return { columns };
};

export default useTableColumns;
