import Validation from '@/utils/Validation';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFiltersValues } from './utils/type';
import DateFns from '@/utils/DateFns';
import ProForm from '@/components/pro-form';
import ProTextField from '@/components/pro-form/ProTextField';
import ProSelect from '@/components/pro-form/ProSelect';
import { forwardRef, useImperativeHandle, ForwardRefRenderFunction } from 'react';
import { FiltersRef } from '@/components/pro-table/types';
import ProDate from '@/components/pro-form/ProDate';
import { ROLES } from '@/constants';

interface IProps {
  onSearch: (params: Partial<IFiltersValues>) => void;
}

const schema = Validation.shape({
  full_name: Validation.string(),
  date: Validation.date(),
  role: Validation.select(-1),
  confirmed: Validation.select(-1),
  gender: Validation.select(-1),
});

const FiltersForm: ForwardRefRenderFunction<FiltersRef, IProps> = (props, ref) => {
  const { onSearch } = props;
  const form = useForm<IFiltersValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: IFiltersValues) => {
    const { date, ...rest } = values;

    onSearch({
      date: DateFns.Format(date),
      ...rest,
    });
  };

  const handleReset = () => {
    form.reset(schema.getDefault());
    onSearch(schema.getDefault());
  };

  const handleError = (error: any) => {
    console.log('handle-filters: ', error);
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
    submit: form.handleSubmit(handleSubmit),
  }));

  return (
    <ProForm form={form} onFinish={handleSubmit} onError={handleError} PaperProps={{ sx: { p: 2 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} md={4}>
          <ProTextField label="Search person" placeholder="Enter person" name="full_name" />
        </Grid>

        <Grid item xs={12} sm={3} md={4}>
          <ProSelect
            name="gender"
            label="Gender"
            placeholder="Select gender"
            options={[
              { value: -1, label: 'All' },
              { value: 1, label: 'Male' },
              { value: 0, label: 'Female' },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={3} md={4}>
          <ProSelect
            name="role"
            label="Permission"
            placeholder="Select role"
            options={[{ value: -1, label: 'All' }, ...ROLES]}
          />
        </Grid>

        <Grid item xs={12} sm={3} md={4}>
          <ProSelect
            name="confirmed"
            label="Status"
            placeholder="Select status"
            options={[
              { value: -1, label: 'All' },
              { value: 1, label: 'Active' },
              { value: 0, label: 'Inactive' },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ProDate
            name="date"
            label="Birthday"
            type="start"
            DatePickerProps={{ inputFormat: 'MM/yyyy', views: ['month', 'year'] }}
          />
        </Grid>
      </Grid>
    </ProForm>
  );
};

export default forwardRef(FiltersForm);
