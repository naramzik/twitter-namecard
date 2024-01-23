import BottomBar from '@/components/layout/BottomBar';
import BasicLayout from './BasicLayout';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <BasicLayout>
      {children}
      <BottomBar />
    </BasicLayout>
  );
};

export default MainLayout;
