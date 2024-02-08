import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const cardCreateHandler = () => {
    router.push(`/default/edit`);
  };

  return (
    <header className="fixed h-10 top-0 left-0 w-screen p-4">
      <nav className="flex items-center justify-around">
        <Link href="/" className="text-lg">
          홈
        </Link>
        <button className="text-lg" onClick={cardCreateHandler}>
          명함 만들기
        </button>
      </nav>
    </header>
  );
};

export default Header;
