import Header from '../ui/Header';
import type { ReactNode } from 'react';

interface LayoutWithHeaderProps {
  children: ReactNode;
}

const LayoutWithHeader = ({ children }: LayoutWithHeaderProps) => {
  return (
    <main className="p-5 mt-16 overflow-x-auto">
      <Header />
      {children}
    </main>
  );
};

export default LayoutWithHeader;
