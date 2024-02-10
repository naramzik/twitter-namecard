import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed flex justify-around items-center w-full max-w-[512px] mx-auto left-0 right-0  h-16 top-0 p-2 z-10 bg-primary text-white">
      <Link href="/" className="text-lg">
        홈
      </Link>
      <Link href="/default/edit" className="text-lg">
        명함 만들기
      </Link>
    </header>
  );
};

export default Header;
