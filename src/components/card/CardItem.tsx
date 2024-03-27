import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { applyDateFormatting } from '@/utils/applyDateFormatting';
import { checkIsNew } from '@/utils/checkIsNew';
import type { CardType } from '@/types/cards';

const CardItem = ({ card }: { card: CardType }) => {
  const [isNew, setIsNew] = useState(false);
  const router = useRouter();
  const openDetailPageHandler = () => {
    localStorage.setItem('cardId', card.id);
    router.push(`/card/${card.id}`, undefined, { shallow: true });
  };

  useEffect(() => {
    const isNew = checkIsNew(card.updated_at);
    setIsNew(isNew);
  }, [card.updated_at]);

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden" onClick={openDetailPageHandler}>
      <div className="m-3 border-gray-400 border">
        <img
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cards/${card.id}/thumbnail`}
          alt="트위터 명함"
          className="aspect-nameCard"
          style={{ width: '100rem', backgroundColor: 'white' }}
        />
      </div>
      <div className="card-body px-5 py-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <h2 className="card-title">{card.nickname}</h2>
            <h3 className="">@{card.twitter}</h3>
          </div>
          {isNew && <div className="badge bg-purple-400 border-none h-8 w-14">NEW</div>}
        </div>
        <p className="w-full text-sm line-clamp-2">{card.bio}</p>
        <time className="justify-start text-xs text-gray-600 pt-3">
          업데이트: {applyDateFormatting(card.updated_at)}
        </time>
      </div>
    </div>
  );
};

export default CardItem;
