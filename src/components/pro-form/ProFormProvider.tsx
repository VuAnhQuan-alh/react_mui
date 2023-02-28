import { type PropsWithChildren, Fragment } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

interface IProps<T extends FieldValues> {
  form?: UseFormReturn<T, any>;
}

const ProFormProvider = <T extends FieldValues>(props: PropsWithChildren<IProps<T>>) => {
  const { children, form } = props;

  if (form) {
    return <FormProvider {...form}>{children}</FormProvider>;
  }

  return <Fragment>{children}</Fragment>;
};

export default ProFormProvider;
