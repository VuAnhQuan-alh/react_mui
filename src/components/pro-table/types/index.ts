import { TableCellProps } from '@mui/material';
import type { ColumnDef, RowData } from '@tanstack/react-table';

export type IProColumn<D, V = any> = ColumnDef<D, V>[];

export type HeadCell<T> = {
  [key in keyof T]?: string;
} & {
  index: string;
  actions: string;
  [key: string]: any;
};

export interface IProTablePaginationProps {
  pageSize: number;
  page: number;
  rowsPerPageOptions?: number[];
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string | null;
  sortDirection?: string | null;
}

export interface FiltersRef<T = any> {
  reset: () => void;
  submit: (values: T) => void;
}

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue = unknown> {
    title?: string;
    info?: string;
    align?: TableCellProps['align'];
    type?: 'text' | 'date' | 'select' | 'img';
    editable?: boolean | ((row: TData) => boolean);
    hidden?: boolean | ((row: TData) => boolean);
    required?: boolean;
  }
}
