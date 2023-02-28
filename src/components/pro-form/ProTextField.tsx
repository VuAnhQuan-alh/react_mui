import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { useController, useFormContext } from 'react-hook-form';
import ProLabel from './ProLabel';
import { useTranslation } from 'react-i18next';

interface Props extends Omit<TextFieldProps, 'name'> {
  name: string;
  label?: string;
}

const ProTextField = (props: Props) => {
  const { name, placeholder, disabled, required, label, ...rest } = props;
  const { t } = useTranslation();

  const { control } = useFormContext();
  const {
    field: { value, ref, onBlur, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <ProLabel name={name} title={label} required={required} gutterBottom>
      <TextField
        id={name}
        fullWidth
        required={required}
        error={Boolean(error)}
        helperText={error?.message && t(error.message)}
        placeholder={disabled ? void 0 : placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ''}
        name={name}
        inputRef={ref}
        {...rest}
      />
    </ProLabel>
  );
};

export default ProTextField;
