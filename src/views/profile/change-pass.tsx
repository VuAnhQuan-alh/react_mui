import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import avt_change from '@/../../public/images/avatar_50.jpeg';
import ProForm from '@/components/pro-form';
import ProPasswordField from '@/components/pro-form/ProPasswordField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Validation from '@/utils/Validation';
import ActionButton from '@/components/pro-button/ActionButton';
import { IValuesForm } from '@/services/auth';

const schema = Validation.shape({
  currentPassword: Validation.string().required(),
  password: Validation.string().required(),
  passwordConfirmation: Validation.string()
    .required()
    .oneOf([Validation.ref('password')], 'schema.validConfirm'),
});

const ChangePassword = () => {
  const form = useForm<IValuesForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: IValuesForm) => {
    console.log(values);
  };

  const handleError = (error: any) => {
    console.log(error);
  };

  return (
    <Container sx={{ my: '62px' }}>
      <Grid container spacing={4} display="flex" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Typography fontSize={20} fontWeight={600} textAlign="center">
            Change Password
          </Typography>

          <Box my="22px">
            <ProForm form={form} onFinish={handleSubmit} onError={handleError}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ProPasswordField name="currentPassword" placeholder="Enter password" label="Current password" />
                </Grid>

                <Grid item xs={12}>
                  <ProPasswordField name="password" placeholder="Enter password" label="Password" />
                </Grid>

                <Grid item xs={12}>
                  <ProPasswordField
                    name="passwordConfirmation"
                    placeholder="Enter password"
                    label="Confirmation password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <ActionButton type="submit" actionType="save" fullWidth>
                    Change password
                  </ActionButton>
                </Grid>
              </Grid>
            </ProForm>

            <Avatar
              src={avt_change}
              alt="avt-change"
              sx={{ width: { xs: '80%', md: '100%' }, height: '100%', mx: 'auto' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChangePassword;
