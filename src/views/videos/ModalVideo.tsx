import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { IFormCreateVideo } from './utils/type';
import { yupResolver } from '@hookform/resolvers/yup';
import Validation from '@/utils/Validation';
import ProTextField from '@/components/pro-form/ProTextField';
import ActionButton from '@/components/pro-button/ActionButton';
import ProForm from '@/components/pro-form';

interface Props {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (values: IFormCreateVideo) => void;
}

const schema = Validation.shape({
  content: Validation.string().required(),
  public: Validation.boolean().optional(),
});

const ModalVideo = (props: Props) => {
  const { open, handleClose, handleSubmit } = props;

  const form = useForm<IFormCreateVideo>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleError = (error: any) => {
    console.log('error-form-create-video: ', error);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" aria-labelledby="dia-title">
      <DialogTitle textAlign="center">I&apos;m modal video</DialogTitle>

      <DialogContent>
        <ProForm form={form} onFinish={handleSubmit} onError={handleError} PaperProps={{ sx: { p: 2 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <IconButton component="label">
                <CardMedia
                  component="video"
                  controls
                  src="https://strapi-img-aws-s3-tt.s3.ap-southeast-1.amazonaws.com/innq2_Yt_Bh8_Kd_G_5t_0eb00d4232.mp4"
                />
              </IconButton>
              <Typography color="blue.700" textAlign="center">
                video-01.mp4
              </Typography>
            </Grid>

            <Grid item xs={12} md={7}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <ProTextField name="content" label="Content" placeholder="Enter content" />
                </Grid>

                <Grid item xs={12}>
                  public
                </Grid>

                <Grid item xs={12}>
                  <ActionButton actionType="add" type="submit">
                    Create video
                  </ActionButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ProForm>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ModalVideo);
