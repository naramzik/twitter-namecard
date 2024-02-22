import Image from 'next/image';
import { useRouter } from 'next/router';

interface Title {
  title: string;
}

const Title = ({ title }: Title) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="fixed top-0 z-10 grid items-center w-full max-w-[512px] mx-auto left-0 right-0 grid-cols-3 h-16 font-bold bg-[#EEF6FF]">
      <Image
        width={25}
        height={25}
        src="/left-arrow.png"
        onClick={handleBack}
        className="flex justify-start ml-2"
        alt="뒤로가기"
      />
      <div className="text-lg text-center">{title}</div>
    </div>
  );
};
export default Title;
