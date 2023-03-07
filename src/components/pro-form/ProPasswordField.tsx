import OutlinedInput, { type OutlinedInputProps } from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Validation from '@/utils/Validation';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AnySchema } from 'yup';
import ProLabel from './ProLabel';
import { useState, MouseEvent } from 'react';

interface Props extends Omit<OutlinedInputProps, 'name'> {
  name: string;
  label?: string;
  validate?: AnySchema;
}

const ProPasswordField = (props: Props) => {
  const { name, placeholder, disabled, required, validate, label, defaultValue, ...rest } = props;
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
  };

  const { control } = useFormContext();
  const {
    field: { value, ref, onBlur, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: validate ? validate.getDefault() : defaultValue,
    rules: { validate: Validation.validate(validate) },
  });

  return (
    <ProLabel name={name} title={label} required={required} gutterBottom>
      <OutlinedInput
        id={name}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        required={required}
        error={Boolean(error)}
        placeholder={disabled ? void 0 : placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ''}
        name={name}
        inputRef={ref}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              aria-label="toggle-password"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
        {...rest}
      />
      {error?.message && <FormHelperText sx={{ color: 'red.600' }}>{t(error.message)}</FormHelperText>}
    </ProLabel>
  );
};

export default ProPasswordField;
