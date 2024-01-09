import MainLayout from '@/components/layout/MainLayout';
import { ReactNode } from 'react';

const Page = () => {
  return <>dd</>;
};

Page.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

export default Page;
