import clsx from 'clsx';
import { forwardRef, HTMLProps } from 'react';

type TextFieldProps = HTMLProps<HTMLInputElement>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { className, ...props }: TextFieldProps,
  ref,
) {
  return <input {...props} ref={ref} className={clsx(className, 'input w-full shadow-sm read-only:bg-slate-100')} />;
});
