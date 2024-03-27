import { ReactNode } from 'react';
import CardItem from '@/components/card/CardItem';
import HomeLayout from '@/components/layout/HomeLayout';
import SEO from '@/components/SEO/SEO';
import { useGetCards } from '@/hooks/queries/useGetCards';
import type { CardType } from '@/types/cards';

export default function Home() {
  const { cards } = useGetCards();

  return (
    <div>
      <SEO description={`트친들의 명함을 둘러보세요🐥`} />
      <main className="flex flex-col gap-5 mx-1 mb-16">
        {cards?.map((card: CardType) => <CardItem card={card} key={card.id} />)}
      </main>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => <HomeLayout>{page}</HomeLayout>;
