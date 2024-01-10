import { ReactNode, useState } from 'react';
import BasicLayout from '@/components/layout/BasicLayout';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  nickname: string;
  twitterId: string;
  instagramId: string;
  githubId: string;
  blog: string;
  hashtag: string;
};

const Page = () => {
  const [formData, setFormData] = useState<FormValues>({
    nickname: '',
    twitterId: '',
    instagramId: '',
    githubId: '',
    blog: '',
    hashtag: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      twitterId: '',
      instagramId: '',
      githubId: '',
      blog: '',
      hashtag: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData(data);
  };

  const requiredSentence = <p>필수 문항입니다.</p>;

  return (
    <>
      <div className="border-2 border-black aspect-nameCard">
        <div>닉네임: {formData.nickname}</div>
        <div>트위터 아이디: {formData.twitterId}</div>
        <div>해시태그: {formData.hashtag}</div>
        <div>인스타 아이디: {formData.instagramId}</div>
        <div>깃허브 아이디: {formData.githubId}</div>
        <div>블로그 주소: {formData.blog}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label>닉네임</label>
        <input {...register('nickname', { required: true, maxLength: 10 })} />
        {errors.twitterId && requiredSentence}

        <label>트위터 아이디</label>
        <input {...register('twitterId', { required: true, maxLength: 10 })} />
        {errors.twitterId && requiredSentence}

        <label>해시태그</label>
        <input {...register('hashtag', { required: true, maxLength: 10 })} />
        {errors.hashtag && requiredSentence}

        <fieldset className="flex flex-col border border-solid border-gray-300 p-2">
          <legend>SNS 아이디</legend>
          <label>인스타</label>
          <input {...register('instagramId', { required: false, maxLength: 10 })} />
          <label>깃허브</label>
          <input {...register('githubId', { required: false, maxLength: 10 })} />
          <label>블로그</label>
          <input {...register('blog', { required: false, maxLength: 10 })} />
        </fieldset>

        <button type="submit" className="btm-nav btm-nav-md max-w-[512px] mx-auto z-20 bg-accent text-white font-bold">
          저장하기
        </button>
      </form>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;

export default Page;
