import { ReactNode } from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  const dummyCards = [
    {
      id: 1,
      name: '김뫄뫄',
      introduction:
        '안녕하세요1 저는 김뫄뫄고요 고양이를 좋아하고요 안녕하세요 저는 김뫄뫄고요 고양이를 좋아하고요안녕하세요 저는 김뫄뫄고요 고양이를 좋아하고요',
      createdAt: '2024-01-16',
      cardImage: '/card.png',
    },
    {
      id: 2,
      name: '김뫄뫄2',
      introduction:
        '안녕하세요22 저는 김뫄뫄고요 고양이를 좋아하고요 안녕하세요 저는 김뫄뫄고요 고양이를 좋아하고요안녕하세요 저는 김뫄뫄고요 고양이를 좋아하고요',
      createdAt: '2024-01-02',
      cardImage: '/card.png',
    },
    {
      id: 3,
      name: '김뫄뫄3',
      introduction:
        '안녕하세요333 저는 김뫄뫄고요 고양이를 좋아하고요 안녕하세요 저는 김뫄뫄고요 고양이를 좋아하고요안녕하세요 저는 김뫄뫄고요 고양이를 좋아하고요',
      createdAt: '2023-12-27',
      cardImage: '/card.png',
    },
  ];

  return (
    <>
      <main className="flex flex-col gap-5 mx-5 mt-5 my-20">
        {dummyCards.map((card) => (
          <div key={card.id} className="card bg-base-100 shadow-xl pt-8">
            <figure>
              <img src={card.cardImage} width="80%" alt="명함" />
            </figure>
            <div className="card-body p-5">
              <h2 className="card-title">
                {card.name}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap">{card.introduction}</p>
              <div className="justify-start">{card.createdAt}</div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

Home.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
