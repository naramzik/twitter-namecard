import clsx from 'clsx';
import Image from 'next/image';
import { forwardRef, HTMLProps, useReducer } from 'react';

type PasswordProps = HTMLProps<HTMLInputElement>;

export const Password = forwardRef<HTMLInputElement, PasswordProps>(function Password(
  { className, ...props }: PasswordProps,
  ref,
) {
  const [showPassword, toggleShowPassword] = useReducer((showPassword) => !showPassword, false);

  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        className={clsx(className, 'input w-full shadow-sm')}
      />
      <button type="button" className="h-10 absolute top-1/2 -translate-y-1/2 right-4" onClick={toggleShowPassword}>
        <Image
          width={22}
          height={22}
          src={showPassword ? '/images/view.png' : '/images/hide.png'}
          alt={showPassword ? '보임' : '숨김'}
        />
      </button>
    </div>
  );
});
