import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRModal from '@/components/modal/QRModal';
import { useCreateShortLink } from '@/hooks/queries/useCreateShortLink';
import { showToastSuccessMessage } from '@/utils/showToastMessage';

const BottomSheet = ({ nickname, cardId }: { nickname: string; cardId: string }) => {
  const { mutate: createShortLink } = useCreateShortLink();
  const modal = useModal();

  const handleShowQRModal = () => {
    createShortLink(
      { cardId },
      {
        onSuccess: (data) => {
          NiceModal.show(QRModal, { shortLink: data.shortLink });
        },
      },
    );
  };

  const handleShareOnTwitter = () => {
    const share_text = `${nickname}의 명함을 공유합니다! 🎉`;
    const link = window.location.href;
    const twitterIntent = `https://twitter.com/intent/tweet?text=${share_text}&url=${link}`;
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
      <div className="z-40 max-w-lg w-full mx-auto fixed bottom-0 left-0 right-0 flex flex-col justify-around items-start bg-white h-64 rounded-t-2xl px-5 pt-10 pb-3">
        <button className="flex w-full gap-3 ml-3" onClick={handleShowQRModal}>
          <Image width={25} height={25} src="/qr-code.png" alt="qr코드" />
          QR코드로 공유하기
        </button>
        <CopyToClipboard
          text={`${window.location.href}`}
          onCopy={() => showToastSuccessMessage('명함 링크가 복사되었습니다.')}
        >
          <button className="w-full flex gap-3 ml-3">
            <Image width={25} height={25} src="/copy.png" alt="링크 복사" />
            링크 복사하기
          </button>
        </CopyToClipboard>
        <button className="flex gap-3 btn w-full btn-primary" onClick={handleShareOnTwitter}>
          <Image width={25} height={25} src="/twitter.png" alt="트위터" />
          트위터에 공유하기
        </button>
      </div>
    </>
  );
};

export default NiceModal.create(BottomSheet);
