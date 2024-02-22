import { ReactNode } from 'react';
import CardItem from '@/components/card/CardItem';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import { useGetCards } from '@/hooks/queries/useGetCards';
import type { CardType } from '@/types/cards';

export default function Home() {
  const { cards } = useGetCards();

  return (
    <>
      <main className="flex flex-col gap-5 mx-1">{cards?.map((card: CardType) => <CardItem card={card} />)}</main>
    </>
  );
}

Home.getLayout = (page: ReactNode) => <LayoutWithHeader>{page}</LayoutWithHeader>;
