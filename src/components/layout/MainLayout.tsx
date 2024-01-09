import BottomBar from '@/components/layout/BottomBar';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="p-5">
      {children}
      <BottomBar />
    </main>
  );
};

export default MainLayout;
