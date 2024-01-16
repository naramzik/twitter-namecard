import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useRef } from 'react';
const BottomSheet = () => {
  const overlayRef = useRef(null);

  const modal = useModal();
  const closeBottomSheet = () => {
    modal.remove();
  };

  return (
    <>
      <div
        className="max-w-lg w-full min-h-screen mx-auto z-30 opacity-50 bg-slate-900 fixed"
        ref={overlayRef}
        onClick={closeBottomSheet}
      />
      <div className="z-40 max-w-lg w-full mx-auto fixed bottom-0 left-0 right-0 flex flex-col items-center justify-around bg-yellow-100 h-40">
        <div>트위터에 공유하기</div>
        <div>QR코드로 공유하기</div>
        <div>바로가기 링크 만들기</div>
      </div>
    </>
  );
};

export default NiceModal.create(BottomSheet);
