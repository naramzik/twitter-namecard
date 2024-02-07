import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const cardCreateHandler = () => {
    router.push(`/default/edit`);
  };

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6">
        <div className="flex">
          <Link href="/">홈</Link>
          <h1 className="text-2xl font-bold" onClick={cardCreateHandler}>
            내 명함 만들기
          </h1>
        </div>
      </nav>
    </header>
  );
};

export default Header;
