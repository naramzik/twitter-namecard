import { ReactNode } from 'react';
import Card from '@/components/card/Card';
import MainLayout from '@/components/layout/MainLayout';
import { useGetCards } from '@/hooks/queries/useGetCards';
import type { CardType } from '@/types/cards';

export default function Home() {
  const { cards } = useGetCards();

  return (
    <>
      <main className="flex flex-col gap-5 mx-5 mt-5 my-20">
        {cards?.map((card: CardType) => <Card card={card} />)}
      </main>
    </>
  );
}

Home.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
