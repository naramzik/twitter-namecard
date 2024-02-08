import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';
import { useCreateCard } from '@/hooks/queries/useCreateCard';

interface Data {
  nickname: string;
  twitter: string;
  instagramId: string;
  githubId: string;
  blog: string;
  hashtag: string;
  password: string;
  customFields: CustomFields[];
}

interface CustomFields {
  key: string;
  contents: string;
}

const Page = () => {
  const router = useRouter();
  const { mutate: createCard } = useCreateCard();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Data>({
    defaultValues: {
      nickname: '',
      twitter: '',
      instagramId: '',
      githubId: '',
      blog: '',
      hashtag: '',
      password: '',
      customFields: [],
    },
  });

  const onSubmit = (data: Data) => {
    const allData = {
      customFields: data.customFields,
      socialMedia: { instagram: data.instagramId, github: data.githubId, blog: data.blog },
      nickname: data.nickname,
      twitter: data.twitter,
      hashtag: data.hashtag,
      password: data.password,
    };

    createCard(allData, {
      onSuccess: (data) => {
        console.log('명함 만들기 성공');
        console.log(data.data.newCard.id);
        // 추후 api 변경되면 바꾸기
        // router.push(`/${data.data.newCard.id}`);
        router.push(`/${data.data.newCard.twitter}`);
      },
    });
  };

  const requiredSentence = <p>필수 문항입니다.</p>;
  // const renderError = (error?: ErrorObject) => error.message && <p>{error.message}</p>

  const nickname = watch('nickname');
  const twitter = watch('twitter');
  const instagramId = watch('instagramId');
  const githubId = watch('githubId');
  const blog = watch('blog');
  const hashtag = watch('hashtag');

  return (
    <div className="pb-12">
      <div className="border-2 border-black aspect-nameCard">
        <div>닉네임: {nickname}</div>
        <div>트위터 아이디: {twitter}</div>
        <div>해시태그: {hashtag}</div>
        <div>인스타 아이디: {instagramId}</div>
        <div>깃허브 아이디: {githubId}</div>
        <div>블로그 주소: {blog}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-5">
        {/* maxLength는 임시값 */}
        <div>
          비밀번호
          <input type="password" {...register('password', { required: true })} name="password" />
          {errors.password && requiredSentence}
        </div>
        <label>
          닉네임
          <input {...register('nickname', { required: true, maxLength: 10 })} name="nickname" />
          {errors.twitter && requiredSentence}
        </label>
        <label>
          트위터 아이디
          <input {...register('twitter', { required: true, maxLength: 10 })} name="twitter" />
          {errors.twitter && requiredSentence}
        </label>
        <label>
          해시태그
          <input {...register('hashtag', { maxLength: 10 })} name="hashtag" />
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
            <input {...register('blog')} name="blog" />
          </label>
        </fieldset>

        {watch('customFields').map((_, index) => (
          <div key={index}>
            <label>
              제목
              <input type="text" {...register(`customFields.${index}.key`)} />
            </label>
            <label>
              내용
              <textarea {...register(`customFields.${index}.contents`)} />
            </label>
          </div>
        ))}

        <button
          type="button"
          className="w-full h-10 bg-primary"
          onClick={() => setValue('customFields', [...watch('customFields'), { key: '', contents: '' }])}
        >
          자유형식 항목 추가하기
        </button>

        <button type="submit" className="btm-nav btm-nav-md max-w-[512px] mx-auto z-20 bg-accent text-white font-bold">
          저장하기
        </button>
      </form>
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <LayoutWithTitle title="명함 수정하기">{page}</LayoutWithTitle>;
};

export default Page;
