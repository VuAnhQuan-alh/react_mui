import useScrollbar from '@/hooks/useScrollbar';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectProps } from '@mui/material/Select';
import { forwardRef, Fragment } from 'react';
import { useController, useFormContext, type FieldValues } from 'react-hook-form';
import PlaceHolder from './PlaceHolder';
import ProLabel from './ProLabel';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

interface Value<T> {
  key: string | number;
  label: string;
  value: T;
  disabled: boolean;
}
interface Props<O extends FieldValues, V extends string | number>
  extends Omit<SelectProps<V>, 'name' | 'renderValue' | 'onSelect' | 'value'> {
  name: string;
  label?: string;
  options: O[];
  renderLabel?: (option: O) => string;
  renderValue?: (option: O) => V;
  getOptionDisabled?: (option: O) => boolean;
  onSelect?: (value: V) => void;
  placeholder: string;
  actionText?: string;
}

const PlainMenuItem = forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const { selected, ...rest } = props;
  return <MenuItem ref={ref} disabled selected={selected} {...rest} />;
});

const ProSelect = <O extends FieldValues, V extends string | number>(props: Props<O, V>) => {
  const {
    name,
    label,
    options,
    renderLabel = (option: O) => option.label,
    renderValue = (option: O) => option.value,
    disabled,
    placeholder,
    actionText,
    getOptionDisabled,
    onSelect,
    required,
    ...rest
  } = props;

  const scrollbar = useScrollbar();
  const { control } = useFormContext();
  const {
    field: { value, onChange, ...others },
    fieldState: { error },
  } = useController({ name, control });

  const { labels, entries } = options.reduce<{
    labels: Record<string | number, string>;
    entries: Value<V>[];
  }>(
    (acc, option, i) => {
      const value = renderValue(option);
      const label = renderLabel(option);
      const disabled = getOptionDisabled?.(option) || false;
      acc.labels[value] = label;
      acc.entries.push({ value, label, disabled, key: i });
      return acc;
    },
    { labels: {}, entries: [] },
  );

  return (
    <ProLabel name={name} title={label} required={required} gutterBottom>
      <FormControl fullWidth error={Boolean(error)} disabled={disabled}>
        <Select<V>
          id={name}
          required={required}
          {...(disabled && {
            IconComponent: () => null,
          })}
          multiple={false}
          MenuProps={{
            MenuListProps: { dense: true },
            PaperProps: { sx: scrollbar },
          }}
          renderValue={(value) => {
            if (!(value in labels)) {
              return <PlaceHolder>{!disabled && placeholder}</PlaceHolder>;
            }
            return <Fragment>{labels[value]}</Fragment>;
          }}
          {...others}
          {...rest}
          value={value in labels ? value : -1}
          onChange={(event) => {
            onChange(event);
            onSelect?.(event.target.value as V);
          }}
        >
          {options.length > 0 && placeholder && (
            <PlainMenuItem value={-1} sx={{ display: 'none' }}>
              {placeholder}
            </PlainMenuItem>
          )}
          {!options.length && !actionText && <PlainMenuItem value={-1}>No Options</PlainMenuItem>}
          {!options.length && actionText && <PlainMenuItem value={-1}>{actionText}</PlainMenuItem>}
          {entries.map((entry) => {
            const { value, label, disabled, key } = entry;
            return (
              <MenuItem key={key} value={value} disabled={disabled}>
                <Typography>{label}</Typography>
              </MenuItem>
            );
          })}
        </Select>
        {error?.message && <FormHelperText variant="outlined">{error.message}</FormHelperText>}
      </FormControl>
    </ProLabel>
  );
};

export default ProSelect;
