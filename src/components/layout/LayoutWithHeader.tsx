import BottomNavigation from '../ui/BottomNavigation';
import type { ReactNode } from 'react';

interface LayoutWithHeaderProps {
  children: ReactNode;
}

const LayoutWithHeader = ({ children }: LayoutWithHeaderProps) => {
  return (
    <main className="p-5 overflow-x-auto">
      <BottomNavigation />
      {children}
    </main>
  );
};

export default LayoutWithHeader;
