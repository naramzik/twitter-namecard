import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import BasicLayout from '@/components/layout/BasicLayout';
import { NextPageWithLayout } from '@/types/page';

interface Password {
  password: string;
}

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const path = `/${router.query.id}/edit`;
  const handleSubmitHandler = (data: Password) => {
    // TODO: 비밀번호가 맞는지 확인하는 로직 추가
    if (data.password === 'testPassword') {
      router.push(path);
    } else {
      console.log('비밀번호가 틀렸습니다.');
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
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(handleSubmitHandler)} className="">
        <div className="flex flex-col">
          <label htmlFor="pw">비밀번호</label>
          <input
            id="pw"
            className="input"
            {...register('password', {
              required: '비밀번호를 입력해 주세요.',
              validate: {},
            })}
          />
          <div>{errors.password?.message}</div>
          <button type="submit" className="btn">
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

export default Page;
