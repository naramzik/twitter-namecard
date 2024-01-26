import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface Password {
  password: string;
}

const Page = () => {
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
    <form onSubmit={handleSubmit(handleSubmitHandler)} className="">
      <label>
        비밀번호
        <input
          {...register('password', {
            required: '필수 입력 항목입니다.',
            maxLength: { value: 10, message: '짧아요' },
            validate: {},
          })}
        />
        {errors.password?.message}
      </label>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Page;
