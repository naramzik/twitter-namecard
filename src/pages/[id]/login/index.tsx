import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

// interface Data {
//   password: string;
// }

const Page = () => {
  const router = useRouter();
  const query = router.query;
  const path = `/${query.id}/edit`;
  const handleSubmitHandler = () => {
    // TODO: data.password를 서버로 보내서 비밀번호가 맞는지 확인
    // 맞으면 명함 수정 페이지로 이동
    router.push(path);
    // 틀리면 틀렸다고 알려주고 이동하지 않음
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
    <form onSubmit={handleSubmit(handleSubmitHandler)} className="">
      <label>
        비밀번호
        <input {...register('password', { required: true, maxLength: 10 })} />
        {errors.password && requiredSentence}
      </label>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Page;
