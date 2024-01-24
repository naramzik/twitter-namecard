import NiceModal, { useModal } from '@ebay/nice-modal-react';
import QRModal from '@/components/modal/QRModal';
import { useCreateShortLink } from '@/hooks/queries/useCreateShortLink';

const BottomSheet = () => {
  const { mutate: createShortLink } = useCreateShortLink();
  const modal = useModal();

  const handleShowQRModal = () => {
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
      <div className="z-40 max-w-lg w-full mx-auto fixed bottom-0 left-0 right-0 flex flex-col items-center justify-around bg-yellow-100 h-40">
        <button>트위터에 공유하기</button>
        <button onClick={handleShowQRModal}>QR코드로 공유하기</button>
        <button>바로가기 링크 만들기</button>
      </div>
    </>
  );
};

export default NiceModal.create(BottomSheet);
