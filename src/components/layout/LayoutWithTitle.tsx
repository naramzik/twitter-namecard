import Title from '@/components/ui/Title';
import BottomNavigation from '../ui/BottomNavigation';
import type { ReactNode } from 'react';

interface LayoutWithTitleProps {
  title: string;
  children: ReactNode;
}

const LayoutWithTitle = ({ title, children }: LayoutWithTitleProps) => {
  return (
    <main className="p-5 mt-16 overflow-x-auto">
      <Title title={title} />
      {children}
      <BottomNavigation />
    </main>
  );
};

export default LayoutWithTitle;
