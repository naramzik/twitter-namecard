import type { ReactNode } from 'react';

interface BasicLayoutProps {
  children: ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return <main className="p-5 h-screen overflow-x-auto">{children}</main>;
};

export default BasicLayout;
