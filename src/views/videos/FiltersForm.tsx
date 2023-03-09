import Grid from '@mui/material/Grid';
import ProForm from '@/components/pro-form';
import ProTextField from '@/components/pro-form/ProTextField';
import { FiltersRef } from '@/components/pro-table/types';
import Validation from '@/utils/Validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { IFiltersValueVideo } from './utils/type';
import ProSelect from '@/components/pro-form/ProSelect';
import ProDateRange from '@/components/pro-form/ProDateRange';
import DateFns from '@/utils/DateFns';

interface Props {
  onSearch: (params: Partial<IFiltersValueVideo>) => void;
}

const schema = Validation.shape({
  content: Validation.string().optional(),
  public: Validation.select(-1),
  from: Validation.date().optional(),
  to: Validation.date().optional(),
});

const FiltersForm: ForwardRefRenderFunction<FiltersRef, Props> = (props, ref) => {
  const { onSearch } = props;
  const form = useForm<IFiltersValueVideo>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: IFiltersValueVideo) => {
    onSearch({
      ...values,
      from: DateFns.Format(values.from),
      to: DateFns.Format(values.to),
    });
  };
  const handleError = (error: any) => {
    console.log('error-form-filter-video: ', error);
  };
  const handleReset = () => {
    form.reset(schema.getDefault());
    onSearch(schema.getDefault());
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
    submit: form.handleSubmit(handleSubmit),
  }));

  return (
    <ProForm form={form} onFinish={handleSubmit} onError={handleError} PaperProps={{ sx: { p: 2 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <ProTextField name="content" label="Content" placeholder="Enter content" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <ProSelect
            name="public"
            label="Public"
            placeholder="Select public"
            options={[
              { value: -1, label: 'All' },
              { value: 1, label: 'Visibility' },
              { value: 0, label: 'Hidden' },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <ProDateRange from="from" to="to" label="Date range" />
        </Grid>
      </Grid>
    </ProForm>
  );
};

export default forwardRef(FiltersForm);
