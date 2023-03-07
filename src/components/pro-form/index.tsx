import type { FieldValues, UseFormReturn } from 'react-hook-form';
import type { HTMLAttributes, PropsWithChildren, ElementType } from 'react';
import type { PaperProps } from '@mui/material/Paper';
import type { BoxProps } from '@mui/material/Box';

import { FormProvider } from 'react-hook-form';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface Props<T extends FieldValues> extends HTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<T, any>;
  paper?: boolean;
  PaperProps?: Partial<PaperProps>;
  BoxProps?: Partial<BoxProps>;
  onFinish?: (values: T) => Promise<void> | void;
  onError?: (errors: unknown) => Promise<void> | void;
  grid?: boolean;
}

const ProForm = <T extends FieldValues>(props: PropsWithChildren<Props<T>>) => {
  const {
    children,
    form,
    paper,
    BoxProps = {},
    onFinish,
    onError,
    grid = true,
    PaperProps = {
      sx: {
        ...(paper && {
          p: 2,
        }),
        ...(grid && {
          p: 2,
          width: '100%',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: 2.5,
        }),
      },
    },
    ...rest
  } = props;

  const Component: ElementType = paper ? Paper : Box;

  return (
    <FormProvider {...form}>
      <Component
        noValidate
        component="form"
        autoComplete="off"
        onSubmit={onFinish ? form.handleSubmit(onFinish, onError) : void 0}
        {...PaperProps}
        {...BoxProps}
        {...rest}
      >
        {children}
      </Component>
    </FormProvider>
  );
};

export default ProForm;
