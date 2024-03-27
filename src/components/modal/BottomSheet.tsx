import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRModal from '@/components/modal/QRModal';
import { showToastSuccessMessage } from '@/utils/showToastMessage';
import type { CardType } from '@/types/cards';
import type { ShortLink } from '@/types/shortLink';

interface Prop {
  card: CardType;
  shortLink: ShortLink;
}

const BottomSheet = ({ card, shortLink }: Prop) => {
  const modal = useModal();

  const handleShowQRModal = () => {
    NiceModal.show(QRModal, { shortLink, imageUrl: card.image_url });
  };

  const handleShareOnTwitter = () => {
    const share_text = `${card.nickname}의 명함을 공유합니다!🎉`;
    const twitterIntent = `https://twitter.com/intent/tweet?text=${share_text}&hashtags=트위터명함&url=${process.env.NEXT_PUBLIC_BACKEND_URL}/s/${shortLink}`;
    window.open(twitterIntent, '_blank');
  };

  const handleCloseBottomSheet = () => {
    modal.remove();
  };

  return (
    <>
      <div
        className="max-w-lg w-full min-h-screen mx-auto fixed bottom-0 left-0 right-0 opacity-60 bg-slate-900 z-30"
        onClick={handleCloseBottomSheet}
      />
      <div className="z-40 max-w-lg w-full mx-auto fixed bottom-0 left-0 right-0 flex flex-col justify-around items-start bg-white h-60 rounded-t-2xl px-3 py-5 pt-10">
        <button className="flex w-full gap-3 ml-3" onClick={handleShowQRModal}>
          <Image width={25} height={25} src="/images/qr-code.png" alt="qr코드" />
          QR코드로 공유하기
        </button>
        <CopyToClipboard
          text={`${process.env.NEXT_PUBLIC_BACKEND_URL}/s/${shortLink}`}
          onCopy={() => showToastSuccessMessage('명함 링크가 복사되었습니다.')}
        >
          <button className="w-full flex gap-3 ml-3">
            <Image width={25} height={25} src="/images/copy.png" alt="링크 복사" />
            링크 복사하기
          </button>
        </CopyToClipboard>
        <button className="flex gap-3 btn w-full btn-primary" onClick={handleShareOnTwitter}>
          <Image width={25} height={25} src="/images/twitter.png" alt="트위터" />
          트위터에 공유하기
        </button>
      </div>
    </>
  );
};

export default NiceModal.create(BottomSheet);
