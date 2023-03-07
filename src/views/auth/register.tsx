import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { RegisterParams } from '@/services/auth';
import Validation from '@/utils/Validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import avt_register from '@/../public/images/avatar_35.jpeg';
import ProForm from '@/components/pro-form';
import ProTextField from '@/components/pro-form/ProTextField';
import ProPasswordField from '@/components/pro-form/ProPasswordField';

const schema = Validation.shape({
  username: Validation.string().required('schema.required'),
  email: Validation.email().required('schema.required'),
  password: Validation.string().required('required'),
});

const Register = () => {
  const form = useForm<RegisterParams>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: RegisterParams) => {
    console.log(values);
  };

  const handleError = (error: any) => {
    console.log('register-error: ', error);
  };

  return (
    <Container sx={{ my: '62px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography textAlign="center" fontSize={20} fontWeight={600}>
            Information IDOL
          </Typography>

          <ProForm form={form} onFinish={handleSubmit} onError={handleError} PaperProps={{ sx: { p: 2 } }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ProTextField name="username" placeholder="Enter username" label="Username" />
              </Grid>

              <Grid item xs={12}>
                <ProTextField name="email" placeholder="Enter email" label="Email" />
              </Grid>

              <Grid item xs={12}>
                <ProPasswordField name="password" placeholder="Enter password" label="Password" />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" sx={{ height: '40px' }} fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </ProForm>
        </Grid>

        <Grid item xs={12} md={6}>
          <Avatar
            src={avt_register}
            alt="avatat-register"
            sx={{ width: { xs: '80%', md: '100%' }, height: '100%', mx: 'auto' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
