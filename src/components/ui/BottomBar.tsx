import { useRouter } from 'next/router';

const BottomBar = () => {
  const router = useRouter();

  const cardCreateHandler = () => {
    router.push(`/default/edit`);
  };

  return (
    <button
      onClick={cardCreateHandler}
      className="btm-nav btm-nav-md max-w-lg mx-auto z-20 bg-accent text-white font-bold"
    >
      내 명함도 만들어보기
    </button>
  );
};

export default BottomBar;
