import { ReactNode, useEffect } from 'react';
import CardItem from '@/components/card/CardItem';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import { useGetCards } from '@/hooks/queries/useGetCards';
import type { CardType } from '@/types/cards';
import { showToastLoadingMessage, showToastSuccessMessage } from '@/utils/showToastMessage';

export default function Home() {
  const { cards } = useGetCards();

  return (
    <div>
      <main className="flex flex-col gap-5 mx-1">
        {cards?.map((card: CardType) => <CardItem card={card} key={card.id} />)}
      </main>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => <LayoutWithHeader>{page}</LayoutWithHeader>;
