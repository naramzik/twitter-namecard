import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';
import { usePostPassword } from '@/hooks/queries/usePostPassword';
import { remove } from '@/libs/axiosInterceptor';
import { NextPageWithLayout } from '@/types/page';

interface Password {
  password: string;
}

const Page: NextPageWithLayout = () => {
  const { mutate: postPassword } = usePostPassword();

  const router = useRouter();
  const cardId = router.query.id as string;
  const mode = router.query.mode;

  const handleSubmitHandler = (data: Password) => {
    switch (mode) {
      case 'edit':
        postPassword(
          {
            cardId,
            password: data.password,
          },
          {
            onSuccess: (data) => {
              localStorage.setItem('accessToken', data.data.access_token);
              router.push(`/${cardId}/edit`);
            },
          },
        );
        break;
      case 'delete':
        postPassword(
          {
            cardId,
            password: data.password,
          },
          {
            onSuccess: (data) => {
              localStorage.setItem('accessToken', data.data.access_token);
              remove(`/api/cards/${cardId}`);
              router.push('/');
            },
          },
        );
        break;
    }
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
          <button type="submit" className="btn bg-primary text-white">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <LayoutWithTitle title="">{page}</LayoutWithTitle>;
};

export default Page;
