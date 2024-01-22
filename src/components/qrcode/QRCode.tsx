import { QRCodeCanvas } from 'qrcode.react';

const QRCode = ({ ...props }) => {
  return (
    <section className="w-full h-[50vh] flex items-center justify-center flex-col" {...props}>
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
      {/* here the "value" is the prop. You can give any link here. */}
    </section>
  );
};

export default QRCode;
