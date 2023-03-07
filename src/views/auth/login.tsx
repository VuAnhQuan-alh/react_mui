import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Validation from '@/utils/Validation';
import ProForm from '@/components/pro-form';
import { LoginParams } from '@/services/auth';
import ProTextField from '@/components/pro-form/ProTextField';
import ProPasswordField from '@/components/pro-form/ProPasswordField';

import avt_login from '@/../../public/images/avatar_36.jpeg';
import useAuth from '@/hooks/useAuth';

const schema = Validation.shape({
  identifier: Validation.string().required('schema.required'),
  password: Validation.string().required('schema.required'),
});

const LoginPage = () => {
  const { login } = useAuth();

  const form = useForm<LoginParams>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: LoginParams) => {
    login(values);
  };

  const handleError = (error: any) => {
    console.log('login-error: ', error);
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
                <ProTextField name="identifier" label="Identifier" placeholder="Enter identifier" />
              </Grid>

              <Grid item xs={12}>
                <ProPasswordField name="password" label="Password" placeholder="Enter password" />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" fullWidth sx={{ height: '40px' }}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </ProForm>
        </Grid>

        <Grid item xs={12} md={6}>
          <Avatar
            src={avt_login}
            alt="avatar-login"
            sx={{ width: { xs: '80%', md: '100%' }, height: '100%', mx: 'auto' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
