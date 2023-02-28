import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { DatePicker, type DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { useController, useFormContext } from 'react-hook-form';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import ProLabel from './ProLabel';
import { DateFormat } from '@/constants/locale';

interface Props {
  name: string;
  label?: string;
  onSelect?: (date: Date | null) => void;
  TextFieldProps?: TextFieldProps;
  shouldDisableDate?: (date: Date | null) => boolean;
  DatePickerProps?: Partial<DatePickerProps<Date, Date>>;
  type: 'start' | 'end';
  disabled?: boolean;
  required?: boolean;
}

const ProDate = (props: Props) => {
  const { name, label, type, disabled, required, onSelect, TextFieldProps, DatePickerProps, shouldDisableDate } = props;

  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });
  const OpenPickerIcon = type === 'start' ? TodayIcon : EventIcon;

  return (
    <ProLabel name={name} title={label} required={required} gutterBottom>
      <DatePicker
        disabled={disabled}
        inputFormat={DateFormat}
        renderInput={(props: any) => {
          const { inputProps = {}, ...rest } = props;
          if (disabled) {
            inputProps.placeholder = void 0;
          }
          return (
            <TextField
              inputProps={inputProps}
              {...rest}
              {...TextFieldProps}
              fullWidth
              size="small"
              error={Boolean(error)}
              helperText={error?.message && error.message}
              id={name}
            />
          );
        }}
        components={{ OpenPickerIcon: disabled ? () => null : OpenPickerIcon }}
        componentsProps={{
          actionBar: {
            actions: ['clear'],
          },
        }}
        shouldDisableDate={shouldDisableDate}
        dayOfWeekFormatter={(day) => `${day}`}
        InputAdornmentProps={{
          position: 'end',
        }}
        onChange={(date: Date | null) => {
          onChange(date);
          onSelect?.(date);
        }}
        value={value}
        {...DatePickerProps}
      />
    </ProLabel>
  );
};

export default ProDate;
