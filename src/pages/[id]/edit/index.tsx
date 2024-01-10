import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BasicLayout from '@/components/layout/BasicLayout';

interface FormValues {
  nickname: string;
  twitterId: string;
  instagramId: string;
  githubId: string;
  blog: string;
  hashtag: string;
}

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
    console.log('data: ', data);
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label>
          닉네임
          <input {...register('nickname', { required: true, maxLength: 10 })} />
          {errors.twitterId && requiredSentence}
        </label>
        <label>
          트위터 아이디
          <input {...register('twitterId', { required: true, maxLength: 10 })} />
          {errors.twitterId && requiredSentence}
        </label>
        <label>
          해시태그
          <input {...register('hashtag', { required: true, maxLength: 10 })} />
          {errors.hashtag && requiredSentence}
        </label>
        <fieldset className="flex flex-col gap-2">
          <legend>SNS 아이디</legend>
          <label>
            인스타
            <input {...register('instagramId', { required: false, maxLength: 10 })} />
          </label>
          <label>
            깃허브
            <input {...register('githubId', { required: false, maxLength: 10 })} />
          </label>
          <label>
            블로그
            <input {...register('blog', { required: false, maxLength: 10 })} />
          </label>
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
