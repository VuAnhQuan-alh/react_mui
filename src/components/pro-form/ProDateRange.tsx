import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import DateRangeIcon from '@mui/icons-material/DateRange';

import { styled } from '@mui/material/styles';
import { useState, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import DateFns from '@/utils/DateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateFormat } from '@/constants/locale';
import ProLabel from './ProLabel';

interface IProps {
  from: string;
  to: string;
  label: string;
  required?: boolean;
}

const ProDateRange = (props: IProps) => {
  const { from, to, label, required } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };

  const { control, getValues } = useFormContext();

  const {
    field: { value: fromValue, onChange: fromOnChange },
  } = useController({ name: from, control });
  const {
    field: { value: toValue, onChange: toOnChange },
  } = useController({ name: to, control });

  const fromDate = getValues(from);
  const toDate = getValues(to);

  return (
    <ProLabel name={from || to} required={required} title={label} gutterBottom>
      <Wrapper ref={ref} focused={focused} onClick={handleOpen}>
        <InputBase
          name={from}
          value={DateFns.Format(fromDate) || ''}
          placeholder="dd/mm/yyyy"
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{
            zIndex: 1,
            pointerEvents: 'none',
            '& .MuiInputBase-input': {
              py: '8.5px',
              pl: 1.75,
              width: '10.5ch',
            },
          }}
        />

        <Box sx={{ px: 0.5 }}>-</Box>

        <InputBase
          name={to}
          value={DateFns.Format(toDate) || ''}
          placeholder="dd/mm/yyyy"
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{
            zIndex: 1,
            pointerEvents: 'none',
            '& .MuiInputBase-input': {
              py: '8.5px',
              pl: 0.5,
              width: '10.5ch',
            },
          }}
        />

        <IconButton onClick={handleOpen} sx={{ mr: 1, zIndex: 1, ml: 'auto' }}>
          <DateRangeIcon />
        </IconButton>

        <Fieldset focused={focused}>
          <Legend />
        </Fieldset>
      </Wrapper>
      <Popover
        open={open}
        anchorEl={ref.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            '& button.MuiPickersDay-root': {
              borderRadius: 1,
            },
            overflow: 'auto',
          }}
        >
          <StaticDatePicker
            maxDate={toValue}
            inputFormat={DateFormat}
            // displayStaticWrapperAs='desktop'
            onChange={(date: Date | null) => {
              fromOnChange(date);
            }}
            value={fromValue}
            renderInput={(params) => <TextField {...params} />}
            componentsProps={{
              actionBar: { actions: ['clear'] },
            }}
            dayOfWeekFormatter={(day) => `${day}`}
            onAccept={(value) => {
              if (value && toDate) {
                setOpen(false);
              }
            }}
          />

          <StaticDatePicker
            minDate={fromValue}
            inputFormat={DateFormat}
            // displayStaticWrapperAs='desktop'
            onChange={(date: Date | null) => {
              toOnChange(date);
            }}
            value={toValue}
            renderInput={(params) => <TextField {...params} />}
            componentsProps={{
              actionBar: { actions: ['clear'] },
            }}
            dayOfWeekFormatter={(day) => `${day}`}
            onAccept={(value) => {
              if (value && fromDate) {
                setOpen(false);
              }
            }}
          />
        </Box>
      </Popover>
    </ProLabel>
  );
};

const Wrapper = styled('div', {
  shouldForwardProp: (prop: string) => !['focused'].includes(prop),
})<{ focused: boolean }>(({ theme, focused }) => ({
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 4,
  position: 'relative',
  cursor: 'pointer',
  ...(!focused && {
    '&:hover': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
    },
  }),
}));

const Fieldset = styled('fieldset', {
  shouldForwardProp: (prop: string) => !['focused'].includes(prop),
})<{ focused: boolean }>(({ theme, focused }) => ({
  position: 'absolute',
  inset: 0,
  top: -5,
  margin: 0,
  padding: theme.spacing(0, 1),
  pointerEvents: 'none',
  overflow: 'hidden',
  minWidth: '0%',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 'inherit',
  ...(focused && {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  }),
}));

const Legend = styled('legend')(() => ({
  float: 'unset',
  width: 'auto',
  overflow: 'hidden',
  display: 'block',
  padding: 0,
  height: 11,
  fontSize: '0.75rem',
  visibility: 'hidden',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
}));

// const Span = styled('legend')(() => ({
//   float: 'unset',
//   width: 'auto',
//   overflow: 'hidden',
//   display: 'block',
//   padding: 0,
//   height: 11,
//   fontSize: '0.75rem',
//   visibility: 'hidden',
//   maxWidth: '100%',
//   whiteSpace: 'nowrap',
// }));

export default ProDateRange;
