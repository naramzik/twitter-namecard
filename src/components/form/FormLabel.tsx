import { ReactNode } from 'react';

interface FormLabelProps {
  label: string;
  required?: boolean;
  errorMessage?: string;
  children: ReactNode;
}

export function FormLabel({ required, label, errorMessage, children }: FormLabelProps) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">
          <span className="font-bold">{label}</span>
          {required && <span className="text-red-700 ml-1">*</span>}
        </span>
      </div>
      <div>{children}</div>
      {errorMessage && (
        <div className="label">
          <span className="label-text-alt text-error">{errorMessage}</span>
        </div>
      )}
    </label>
  );
}
