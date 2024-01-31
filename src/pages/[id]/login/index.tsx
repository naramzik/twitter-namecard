import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import BasicLayout from '@/components/layout/BasicLayout';
import { NextPageWithLayout } from '@/types/page';
import { showToast } from '@/utils/showToast';

// interface Data {
//   password: string;
// }

const Page = () => {
  const router = useRouter();
  const path = `/${router.query.id}/edit`;
  const handleSubmitHandler = (data: Password) => {
    // TODO: 비밀번호가 맞는지 확인하는 로직 추가
    if (data.password === 'testPassword') {
      router.push(path);
    } else {
      showToast('error message', 'error');
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

  const requiredSentence = '필수 입력 항목입니다.';
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="text-center text-3xl my-32">본인 인증</div>
      <form onSubmit={handleSubmit(handleSubmitHandler)} className="w-full">
        <div className="flex flex-col gap-1">
          <input
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

export default Page;
