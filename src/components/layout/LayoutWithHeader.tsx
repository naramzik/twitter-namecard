import Header from '../ui/Header';
import BasicLayout from './BasicLayout';
import type { ReactNode } from 'react';

interface LayoutWithHeaderProps {
  children: ReactNode;
}

const LayoutWithHeader = ({ children }: LayoutWithHeaderProps) => {
  return (
    <BasicLayout>
      <Header />
      <div className="pt-10">{children}</div>
    </BasicLayout>
  );
};

export default LayoutWithHeader;
