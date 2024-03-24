import { ReactNode } from 'react';
import CardItem from '@/components/card/CardItem';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import SEO from '@/components/SEO/SEO';
import { useGetCards } from '@/hooks/queries/useGetCards';
import type { CardType } from '@/types/cards';

export default function Home() {
  const { cards } = useGetCards();

  return (
    <div>
      <SEO />
      <main className="flex flex-col gap-5 mx-1 mb-16">
        {cards?.map((card: CardType) => <CardItem card={card} key={card.id} />)}
      </main>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => <LayoutWithHeader>{page}</LayoutWithHeader>;
