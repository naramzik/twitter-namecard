import type { ReactNode } from 'react';

interface BasicLayoutProps {
  children: ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return <main className="p-5">{children}</main>;
};

export default BasicLayout;
