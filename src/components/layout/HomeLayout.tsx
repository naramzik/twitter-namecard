import BottomNavigation from '../ui/BottomNavigation';
import type { ReactNode } from 'react';

interface LayoutWithHeaderProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: LayoutWithHeaderProps) => {
  return (
    <>
      {process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL && (
        <aside className="bg-yellow-500 font-bold p-3 text-black text-center text-sm">
          서비스가 마음에 드신다면...{' '}
          <a href={process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL} className="link underline-offset-4">
            커피 한잔
          </a>
          은 어떠신가요? ☕️
        </aside>
      )}
      <main className="p-5 overflow-x-auto">
        <BottomNavigation />
        {children}
      </main>
    </>
  );
};

export default HomeLayout;
