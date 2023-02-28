import type { TypographyProps } from '@mui/material/Typography';
import type { FormLabelProps } from '@mui/material/FormLabel';
import { FC, Fragment } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

interface Props extends FormLabelProps {
  name: string;
  title?: string;
  gutterBottom?: TypographyProps['gutterBottom'];
  gutterLeft?: TypographyProps['gutterBottom'];
  TypographyProps?: Partial<TypographyProps>;
}

const ProLabel: FC<Props> = (props) => {
  const { name, title, children, gutterBottom = true, gutterLeft = false, TypographyProps = {}, ...rest } = props;

  if (!title) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormLabel
        htmlFor={name}
        {...rest}
        sx={{
          display: 'inline-flex',
          '& .MuiFormLabel-asterisk': {
            color: 'red.600',
          },
        }}
      >
        <Typography gutterBottom={gutterBottom} {...TypographyProps} sx={{ ml: gutterLeft ? '0.5em' : void 0 }}>
          {title}
        </Typography>
      </FormLabel>
      {children}
    </Box>
  );
};

export default ProLabel;
