import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Image from 'next/image';
import QRModal from '@/components/modal/QRModal';
import { useCreateShortLink } from '@/hooks/queries/useCreateShortLink';

const BottomSheet = () => {
  const { mutate: createShortLink } = useCreateShortLink();
  const modal = useModal();

  const handleShowQRModal = () => {
    // TODO: 명함 상세 페이지에서 get 요청으로 가져온 cardId 넣기
    const cardId = '';
    createShortLink(
      { cardId },
      {
        onSuccess: ({ data }) => {
          NiceModal.show(QRModal, { shortLink: data.shortLink });
        },
      },
    );
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
        <button className="flex gap-3 ml-3" onClick={handleShowQRModal}>
          <Image width={25} height={25} src="/qr-code.png" alt="qr코드" />
          QR코드로 공유하기
        </button>
        <button className="flex gap-3 ml-3">
          <Image width={25} height={25} src="/copy.png" alt="링크 복사" />
          링크 복사하기
        </button>
        <button className="flex gap-3 btn w-full btn-primary">
          <Image width={25} height={25} src="/twitter.png" alt="트위터" />
          트위터에 공유하기
        </button>
      </div>
    </>
  );
};

export default NiceModal.create(BottomSheet);
