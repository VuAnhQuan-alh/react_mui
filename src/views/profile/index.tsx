import Typography from '@mui/material/Typography';
import IconButtonton from '@mui/material/IconButton';
import ActionButton from '@/components/pro-button/ActionButton';
import ProForm from '@/components/pro-form';
import ProDate from '@/components/pro-form/ProDate';
import ProSelect from '@/components/pro-form/ProSelect';
import ProTextField from '@/components/pro-form/ProTextField';
import useAuth from '@/hooks/useAuth';
import Validation from '@/utils/Validation';
import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import useUpload from '@/hooks/useUpload';
import { ChangeEvent, useEffect, useState } from 'react';
import DateFns from '@/utils/DateFns';
import { ProfileValues } from '@/utils/types';
import { createProfile, ProfileParams } from '@/services/auth';
import { ROLES } from '@/constants';

interface FILE extends FileList {
  preview: string | null;
}

const schema = Validation.shape({
  full_name: Validation.string().required('schema.required'),
  date_of_birth: Validation.date().optional(),
  email: Validation.email().optional(),
  gender: Validation.select(-1).min(0, 'schema.validSelect'),
  phone_number: Validation.phone().optional(),
  address: Validation.string().optional(),
  role: Validation.select(-1),
  avatar: Validation.mixed(),
});

const Profile = () => {
  const { user } = useAuth();
  const [handleUpload] = useUpload();
  const [avatar, setAvatar] = useState<FILE | null>(null);

  const form = useForm<ProfileValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      ...schema.getDefault(),
      email: user?.email,
      full_name: user?.person_profile?.full_name,
      date_of_birth: new Date(user?.person_profile?.date_of_birth),
      address: user?.person_profile?.address,
      role: user?.person_profile?.role,
    },
  });

  const handleLoadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = { ...event.target.files, preview: null } as FILE;
    if (file) file.preview = URL.createObjectURL(file[0]);
    setAvatar(file);
  };

  const handleSubmit = async (values: ProfileValues) => {
    try {
      const file = avatar && (await handleUpload(avatar[0]));

      const data = {
        full_name: values.full_name,
        avatar: file?.id
          ? {
              set: [file.id],
            }
          : null,
        date_of_birth: DateFns.Format(values.date_of_birth, 'yyyy-MM-dd'),
        email: user?.email,
        gender: values.gender ? 'Male' : 'Female',
        phone_number: values.phone_number,
        address: values.address,
        role: ROLES.find((item) => item.value === values.role)?.label,
        confirmed: true,
        users_permissions_user: {
          set: [user?.id],
        },
      };

      console.log(data);
      const result = await createProfile(data);
      console.log(result);
    } catch (error) {
      console.log('submit profile: ', error);
    }
  };

  useEffect(() => {
    return () => {
      avatar?.preview && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar?.preview]);

  return (
    <Box my="22px">
      <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography fontSize={20} fontWeight={600}>
              Profile details
            </Typography>
          </Grid>

          <Grid item xs={12} md={5.5}>
            <IconButtonton component="label" sx={{ width: '100%', height: '100%' }}>
              <Avatar
                src={user?.person_profile?.avatar.url || avatar?.preview}
                alt="avt-user"
                sx={{ mx: 'auto', width: { xs: '80%', md: '100%' }, height: '100%' }}
              />
              <input onChange={handleLoadedFile} hidden accept="image/*" type="file" />
            </IconButtonton>
          </Grid>

          <Grid item xs={12} md={6.5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ProTextField name="full_name" label="Full name" placeholder="Enter full name" />
              </Grid>

              <Grid item xs={12}>
                <ProTextField name="email" label="Email" placeholder="Enter email" />
              </Grid>

              <Grid item xs={6}>
                <ProDate name="date_of_birth" label="Birthday" type="start" />
              </Grid>

              <Grid item xs={6}>
                <ProTextField name="phone_number" label="Phone number" placeholder="Enter number" />
              </Grid>

              <Grid item xs={5}>
                <ProSelect
                  name="gender"
                  placeholder="Select gender"
                  label="Gender"
                  options={[
                    { value: -1, label: 'Select gender' },
                    { value: 1, label: 'Male' },
                    { value: 0, label: 'Female' },
                  ]}
                />
              </Grid>

              <Grid item xs={7}>
                <ProSelect
                  name="role"
                  options={[{ value: -1, label: 'Select role' }, ...ROLES]}
                  placeholder="Select Role"
                  label="Permission"
                />
              </Grid>

              <Grid item xs={12}>
                <ProTextField name="address" label="Address" placeholder="Enter address" />
              </Grid>

              <Grid item xs={12}>
                <ActionButton type="submit" actionType="save" fullWidth>
                  Save profile
                </ActionButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ProForm>
    </Box>
  );
};

export default Profile;
