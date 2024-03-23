import clsx from 'clsx';
import { forwardRef, HTMLProps } from 'react';

type TextAreaProps = HTMLProps<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { className, ...props }: TextAreaProps,
  ref,
) {
  return (
    <textarea {...props} ref={ref} className={clsx(className, 'textarea w-full shadow-sm read-only:bg-slate-100')} />
  );
});
