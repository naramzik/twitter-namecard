import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { QRCodeCanvas } from 'qrcode.react';

const QRModal = () => {
  const modal = useModal();

  const handleCloseQRModal = () => {
    modal.remove();
  };
  return (
    <>
      <div
        className="max-w-lg w-full min-h-screen mx-auto fixed bottom-0 left-0 right-0 opacity-60 bg-slate-900 z-30"
        onClick={handleCloseQRModal}
      />
      <section className="w-full h-[calc(100vh-10rem)] z-50 flex fixed top-0 left-0 items-center justify-center flex-col">
        <h1 className="text-primary text-4xl mb-4 font-bold text-center">QR CODE</h1>
        <QRCodeCanvas
          className="border-primary border-4 rounded-xl"
          fgColor="#393E46"
          size={250}
          value="https://www.wonju.go.kr/www/selectBbsNttView.do?key=203&bbsNo=136&nttNo=372323&searchCtgry=&searchCnd=all&searchKrwd=&pageIndex=9&integrDeptCode="
          imageSettings={{
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
