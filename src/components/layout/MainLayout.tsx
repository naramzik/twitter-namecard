import Header from '../ui/Header';
import BasicLayout from './BasicLayout';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <BasicLayout>
      <Header />
      <div className="pt-10">{children}</div>
    </BasicLayout>
  );
};

export default MainLayout;
