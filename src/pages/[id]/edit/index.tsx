import { ReactNode, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BasicLayout from '@/components/layout/BasicLayout';

interface Data {
  nickname: string;
  twitterId: string;
  instagramId: string;
  githubId: string;
  blog: string;
  hashtag: string;
}

interface FreeItemProp {
  index: number;
}

interface FreeItemData {
  id: number;
  title: string;
  content: string;
}

const Page = () => {
  const [freeItemData, setFreeItemData] = useState<FreeItemData[]>([{ id: 0, title: '', content: '' }]);

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

  const countRef = useRef(0);

  const FreeItem = ({ index }: FreeItemProp) => {
    const item = freeItemData.filter((item) => item.id === index - 1);
    return (
      <div className="flex flex-col gap-2">
        <input
          value={item.title}
          onChange={(e) =>
            setFreeItemData((prevData) =>
              prevData.map((item) => (item.id === index ? { ...item, title: e.target.value } : item)),
            )
          }
          placeholder="자유항목 제목을 입력해 주세요."
        />
        <textarea
          value={item.content}
          onChange={(e) =>
            setFreeItemData((prevData) =>
              prevData.map((item) => (item.id === index ? { ...item, content: e.target.value } : item)),
            )
          }
          className="min-h-24 resize-y"
          placeholder="자유항목 내용을 입력해 주세요."
        />
      </div>
    );
  };

  // <FreeItem /> 아래에 있어야 해서 useState를 가장 위로 빼줄 수 없었음
  const [freeItems, setFreeItems] = useState<JSX.Element[]>([<FreeItem index={0} />]);

  const onSubmit = (data: Data) => {
    console.log(data);
  };

  const addFreeItem = () => {
    countRef.current += 1;
    setFreeItems((prevItems) => [...prevItems, <FreeItem index={countRef.current} />]);
    setFreeItemData((prevData) => [...prevData, { id: countRef.current, title: '', content: '' }]);
  };

  const requiredSentence = <p>필수 문항입니다.</p>;
  // const renderError = (error?: ErrorObject) => error.message && <p>{error.message}</p>

  const nickname = watch('nickname');
  const twitterId = watch('twitterId');
  const instagramId = watch('instagramId');
  const githubId = watch('githubId');
  const blog = watch('blog');
  const hashtag = watch('hashtag');

  return (
    <div className="pb-12">
      <div className="border-2 border-black aspect-nameCard">
        <div>닉네임: {nickname}</div>
        <div>트위터 아이디: {twitterId}</div>
        <div>해시태그: {hashtag}</div>
        <div>인스타 아이디: {instagramId}</div>
        <div>깃허브 아이디: {githubId}</div>
        <div>블로그 주소: {blog}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-5">
        // maxLength는 임시값
        <label>
          닉네임
          <input {...register('nickname', { required: true, maxLength: 10 })} name="nickname" />
          {errors.twitterId && requiredSentence}
        </label>
        <label>
          트위터 아이디
          <input {...register('twitterId', { required: true, maxLength: 10 })} name="twitterId" />
          {errors.twitterId && requiredSentence}
        </label>
        <label>
          해시태그
          <input {...register('hashtag', { required: true, maxLength: 10 })} name="hashtag" />
          {errors.hashtag && requiredSentence}
        </label>
        <fieldset className="flex flex-col gap-2">
          <legend>SNS 아이디</legend>
          <label>
            인스타
            <input {...register('instagramId', { maxLength: 10 })} name="instagramId" />
          </label>
          <label>
            깃허브
            <input {...register('githubId', { maxLength: 10 })} name="githubId" />
          </label>
          <label>
            블로그
            <input {...register('blog', { maxLength: 10 })} name="blog" />
          </label>
        </fieldset>
        {freeItems}
        <button type="button" className="w-full h-10 bg-primary" onClick={addFreeItem}>
          자유형식 항목 추가하기
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
