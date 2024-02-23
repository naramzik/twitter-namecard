import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedCardIdState } from '@/store/cardId';
import { applyDateFormatting } from '@/utils/applyDateFormatting';
import { checkIsNew } from '@/utils/checkIsNew';
import type { CardType } from '@/types/cards';

const CardItem = ({ card }: { card: CardType }) => {
  const setSelectedCardId = useSetRecoilState(selectedCardIdState);
  const [isNew, setIsNew] = useState(false);
  const router = useRouter();
  const openDetailPageHandler = () => {
    setSelectedCardId(card.id);
    router.push(`/${card.id}`, undefined, { shallow: true });
  };

  useEffect(() => {
    const isNew = checkIsNew(card.updated_at);
    setIsNew(isNew);
  }, [card.updated_at]);

  return (
    // Todo: 명함 컴포넌트 만들기
    <div key={card.id} className="card bg-base-100 shadow-xl pt-4" onClick={openDetailPageHandler}>
      <div className="mx-auto w-11/12 h-40 bg-gray-300 rounded-xl"></div>
      <div className="card-body p-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <h2 className="card-title">{card.nickname}</h2>
            <h3 className="">@{card.twitter}</h3>
          </div>
          {isNew && <div className="badge bg-purple-400 border-none h-8 w-14">NEW</div>}
        </div>
        <p className="w-full text-sm line-clamp-2">{card.bio}</p>
        {/* TODO: 추후 updatedAt api가 추가되면 수정 예정 */}
        <time className="justify-start text-xs text-gray-600 pt-3">
          업데이트: {applyDateFormatting(card.updated_at)}
        </time>
      </div>
    </div>
  );
};

export default CardItem;
