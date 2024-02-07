import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import BasicLayout from '@/components/layout/BasicLayout';
import { usePostPassword } from '@/hooks/queries/usePostPassword';
import { NextPageWithLayout } from '@/types/page';

interface Password {
  password: string;
}

const Page: NextPageWithLayout = ({ cardId }) => {
  const { mutate: postPassword } = usePostPassword();

  const router = useRouter();
  // TODO: 전역상태로 cardId 저장해서 사용하기
  const path = `/${cardId}/edit`;

  const handleSubmitHandler = (data: Password) => {
    postPassword(
      {
        cardId,
        password: data.password,
      },
      {
        onSuccess: () => {
          console.log(cardId, data.password);
          console.log('성공');
          router.push(path);
        },
      },
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
    },
  });

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="text-center text-3xl my-32">본인 인증</div>
      <form onSubmit={handleSubmit(handleSubmitHandler)} className="w-full">
        <div className="flex flex-col gap-1">
          <input
            type="password"
            className="input input-md"
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호를 입력해 주세요.',
            })}
          />
          <div className="text-sm text-red-500">{errors.password?.message}</div>
          <button type="submit" className="btn bg-accent text-white">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cardId = context.params?.id;
  return {
    props: { cardId },
  };
};

export default Page;
