import { ColumnDef } from '@tanstack/react-table';

const Index = <T extends object>(page: number, pageSize: number) => {
  const component: ColumnDef<T, any> = {
    id: 'index',
    size: 50,
    header: () => 'STT',
    cell: ({ row }) => row.index + 1 + (page - 1) * pageSize,
    meta: {
      title: 'STT',
      align: 'center',
    },
  };

  return component;
};

export default Index;
