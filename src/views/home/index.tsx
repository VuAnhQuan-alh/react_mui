import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import ProForm from '@/components/pro-form';
import ProDate from '@/components/pro-form/ProDate';
import ProTextField from '@/components/pro-form/ProTextField';
import ProSelect from '@/components/pro-form/ProSelect';
import ProDateRange from '@/components/pro-form/ProDateRange';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { STATUS } from '@/constants';
import Validation from '@/utils/Validation';
import DateFns from '@/utils/DateFns';
import { Button } from '@mui/material';
import ProTable from '@/components/pro-table';

interface FilterValues {
  name: string;
  status: number;
  startDate: Date | null;
  endDate: Date | null;
  centerDate: Date | null;
}
const schema = Validation.shape({
  name: Validation.string().optional(),
  status: Validation.select(STATUS.all),
  startDate: Validation.date().optional(),
  endDate: Validation.date().optional(),
  centerDate: Validation.date().optional(),
});

const HomePage = () => {
  const form = useForm<FilterValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleReset = () => {
    form.reset(schema.getDefault());
  };
  const handleSubmit = (values: FilterValues) => {
    const { startDate, endDate, centerDate, ...rest } = values;
    console.log({
      ...rest,
      start: DateFns.Format(startDate),
      end: DateFns.Format(endDate),
      center: DateFns.Format(centerDate),
    });
  };

  return (
    <section>
      <Box>
        <Typography>Home page components</Typography>
      </Box>

      <Container sx={{ marginTop: 5 }}>
        <Stack direction="row" gap={2}>
          <ProForm form={form} onFinish={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3.5} lg={4}>
                <ProTextField name="name" label="Search text" placeholder="Enter text" />
              </Grid>

              <Grid item xs={12} sm={6} md={2} lg={2}>
                <ProSelect
                  name="status"
                  label="Status"
                  placeholder="Select status"
                  options={[
                    { value: -1, label: 'All' },
                    { value: 1, label: 'Visibility' },
                    { value: 2, label: 'Hidden' },
                  ]}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3.5}>
                <ProDateRange from="startDate" to="endDate" label="Date Range" />
              </Grid>

              <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
                <ProDate
                  name="centerDate"
                  label="Date No"
                  type="start"
                  TextFieldProps={{ placeholder: 'Select date' }}
                />
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="end" spacing={2}>
              <Button variant="outlined" startIcon={<ClearIcon />} onClick={handleReset}>
                Clean
              </Button>
              <Button type="submit" startIcon={<SearchIcon />}>
                Search
              </Button>
            </Stack>
          </ProForm>
        </Stack>

        <ProTable />
      </Container>
    </section>
  );
};

export default HomePage;
