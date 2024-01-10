import { ReactNode } from 'react';
import BasicLayout from '@/components/layout/BasicLayout';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  nickname: string;
  twitterId: string;
  snsId: string;
  hashtag: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      twitterId: '',
      snsId: '',
      hashtag: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert(JSON.stringify(data));
  };

  const requiredSentence = <p>필수 문항입니다.</p>;
  return (
    <>
      <div className="border-2 border-black aspect-nameCard">명함 컴포넌트</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label>닉네임</label>
        <input {...register('nickname', { required: true, maxLength: 10 })} />
        {errors.twitterId && requiredSentence}

        <label>트위터 아이디</label>
        <input {...register('twitterId', { required: true, maxLength: 10 })} />
        {errors.twitterId && requiredSentence}

        <label>SNS 아이디</label>
        <input {...register('snsId', { required: true, maxLength: 10 })} />
        {errors.snsId && requiredSentence}

        <label>해시태그</label>
        <input {...register('hashtag', { required: true, maxLength: 10 })} />
        {errors.hashtag && requiredSentence}

        <button type="submit" className="btm-nav btm-nav-md max-w-[512px] mx-auto z-20 bg-accent text-white font-bold">
          저장하기
        </button>
      </form>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;

export default Page;
