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
  const FreeItem = () => {
    return (
      <div className="flex flex-col gap-2">
        <input placeholder="자유항목 제목을 입력해 주세요." />
        <textarea className="h-24" placeholder="자유항목 내용을 입력해 주세요." />
      </div>
    );
  };

  const [freeItems, setFreeItems] = useState([<FreeItem />]);

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

  const addFreeItem = () => {
    setFreeItems([...freeItems, <FreeItem />]);
  };

  const requiredSentence = <p>필수 문항입니다.</p>;

  return (
    <div className="pb-12">
      <div className="border-2 border-black aspect-nameCard">
        <div>닉네임: {formData.nickname}</div>
        <div>트위터 아이디: {formData.twitterId}</div>
        <div>해시태그: {formData.hashtag}</div>
        <div>인스타 아이디: {formData.instagramId}</div>
        <div>깃허브 아이디: {formData.githubId}</div>
        <div>블로그 주소: {formData.blog}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-5">
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

        {freeItems.map((item, index) => (
          <FreeItem key={index} />
        ))}
        <button className="w-full h-10 bg-primary" onClick={addFreeItem}>
          항목 추가하기
        </button>

        <button type="submit" className="btm-nav btm-nav-md max-w-[512px] mx-auto z-20 bg-accent text-white font-bold">
          저장하기
        </button>
      </form>
    </div>
  );
};

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;

export default Page;
