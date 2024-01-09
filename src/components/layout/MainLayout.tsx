import type { ReactNode } from 'react';
import BottomBar from '@/components/layout/BottomBar';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main>
      {children}
      <BottomBar />
    </main>
  );
};

export default MainLayout;
