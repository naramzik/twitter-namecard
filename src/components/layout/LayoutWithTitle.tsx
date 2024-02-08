import Title from '@/components/ui/Title';
import BasicLayout from './BasicLayout';
import type { ReactNode } from 'react';

interface LayoutWithTitleProps {
  title: string;
  children: ReactNode;
}

const LayoutWithTitle = ({ title, children }: LayoutWithTitleProps) => {
  return (
    <BasicLayout>
      <Title title={title} />
      {children}
    </BasicLayout>
  );
};

export default LayoutWithTitle;
