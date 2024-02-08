import { useRouter } from 'next/router';
import LeftArrow from '../icon/LeftArrow';

const LayoutWithTitle = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="fixed top-0 z-10 grid items-center w-full max-w-[512px] mx-auto left-0 right-0 grid-cols-3 px-3 h-20 bg-white">
      <LeftArrow className="flex justify-start" onClick={handleBack} />
      <h1 className="text-xl font-bold text-center text-gray-dark">'수정하기 / 생성하기 '</h1>
    </div>
  );
};

export default LayoutWithTitle;
