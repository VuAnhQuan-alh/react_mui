import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Index from '@/components/pro-table/core/Index';
import type { HeadCell, IProColumn } from '@/components/pro-table/types';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { IVideos } from './utils/type';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCopyToClipboard } from 'react-use';
import LaunchIcon from '@mui/icons-material/Launch';

import Link from '@mui/material/Link';
import { Link as ReactLink } from 'react-router-dom';

interface Props {
  page: number;
  pageSize: number;
}

const columnHelper = createColumnHelper<IVideos>();

const HEAD_CELLS: HeadCell<IVideos> = {
  index: 'STT',

  content: 'Content',
  public: 'Public',
  play: 'URI',

  actions: 'Actions',
};

const useTableColumns = (props: Props) => {
  const { page, pageSize } = props;
  const [, copyToClip] = useCopyToClipboard();

  const columns: IProColumn<IVideos> = useMemo(() => {
    return [
      Index<IVideos>(page, pageSize),

      columnHelper.accessor('content', {
        size: 280,
        cell: (info) => (
          <Box
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {info.getValue()}
          </Box>
        ),
        header: () => HEAD_CELLS.content,
        meta: {
          title: HEAD_CELLS.content,
        },
      }),

      columnHelper.accessor('public', {
        size: 100,
        cell: (info) => (info.getValue() ? 'Visibility' : 'Hidden'),
        header: () => HEAD_CELLS.public,
        meta: {
          title: HEAD_CELLS.public,
          align: 'center',
        },
      }),

      columnHelper.accessor('play', {
        size: 50,
        cell: (info) => (
          <Stack direction="row" justifyContent="center" spacing={1}>
            <Tooltip title="Copy link">
              <IconButton onClick={() => copyToClip(info.getValue())}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Open link">
              <Link component={ReactLink} to={info.getValue()} target="_black">
                <IconButton>
                  <LaunchIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </Stack>
        ),
        header: () => HEAD_CELLS.play,
        meta: {
          title: HEAD_CELLS.play,
          align: 'center',
        },
      }),

      {
        id: 'actions',
        size: 50,
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
  }, [page, pageSize, copyToClip]);

  return { columns };
};

export default useTableColumns;
