import { styled } from '@mui/material/styles';
import TableCell, { type TableCellProps } from '@mui/material/TableCell';

interface IProps extends TableCellProps {
  fixed?: 'left' | 'right' | false;
  cellHeader?: boolean;
  selected?: boolean;
  offset: number;
}

const ProTableCell = styled(TableCell, {
  shouldForwardProp: (prop: string) => !['fixed', 'cellHeader', 'selected', 'offset'].includes(prop),
})<IProps>(({ theme, fixed, cellHeader, selected, offset }) => ({
  ...(fixed && {
    position: 'sticky',
    ...(fixed === 'left' && {
      left: offset,
      boxShadow: '1px 0px 3px -2px rgb(0 0 0 / 20%)',
      zIndex: theme.zIndex.appBar + 1,
    }),
    ...(fixed === 'right' && {
      right: 0,
      boxShadow: '-1px 0px 3px -2px rgb(0 0 0 / 20%)',
      zIndex: theme.zIndex.appBar + 1,
    }),
    ...(cellHeader && {
      zIndex: theme.zIndex.appBar + 2,
    }),
  }),

  ...(cellHeader && {
    whiteSpace: 'nowrap',
    backgroundColor: theme.palette.grey[300],
  }),

  ...(!cellHeader && {
    backgroundColor: theme.palette.common.white,
  }),

  ...(selected && {
    backgroundColor: theme.palette.grey[200],
  }),
}));

export default ProTableCell;
