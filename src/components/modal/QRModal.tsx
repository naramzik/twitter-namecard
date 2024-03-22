import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';
import { ShortLink } from '@/types/shortLink';

const QRModal = ({ shortLink }: ShortLink) => {
  const modal = useModal();
  const qrModalRef = useRef(null);
  const shortLinkUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${shortLink}`;
  const handleCloseQRModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target !== qrModalRef.current) return;
    modal.remove();
  };

  return (
    <>
      <section
        className="w-full h-[calc(100vh-10rem)] z-50 flex fixed top-0 left-0 items-center justify-center flex-col"
        onClick={handleCloseQRModal}
        ref={qrModalRef}
      >
        <h1 className="text-primary text-4xl mb-4 font-bold text-center">QR CODE</h1>
        <QRCodeCanvas
          className="border-primary border-4 rounded-xl"
          fgColor="#393E46"
          size={250}
          value={shortLinkUrl}
          imageSettings={{
            // TODO: 명함 페이지에 있는 정보 중 이미지 가져오기
            src: 'https://www.wonju.go.kr/DATA/bbs/136/202107031124275466AEAEDB644417BBG.jpg',
            width: 60,
            height: 60,
            excavate: false,
          }}
        />
      </section>
    </>
  );
};

export default NiceModal.create(QRModal);
