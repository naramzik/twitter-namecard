import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCard } from '@/hooks/queries/useCreateCard';
import { useUpdateCard } from '@/hooks/queries/useUpdateCard';

interface Data {
  nickname: string;
  twitter: string;
  instagramId: string;
  githubId: string;
  blog: string;
  hashtags: string[];
  password: string;
  customFields: CustomFields[];
}

interface CustomFields {
  key: string;
  contents: string;
}

const CardForm = ({ cardId }: { cardId: string | null }) => {
  console.log('cardId cardForm: ', cardId);
  const router = useRouter();
  const { mutate: createCard } = useCreateCard();
  const { mutate: updateCard } = useUpdateCard();
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Data>({
    defaultValues:
      cardId === null
        ? {
            nickname: '',
            twitter: '',
            instagramId: '',
            githubId: '',
            blog: '',
            hashtags: [],
            password: '',
            customFields: [],
          }
        : async () => await axios.get(`/api/cards/${cardId}`).then((res) => res.data.foundCard),
  });
  // { defaultValues: async () => axios.get(`/api/cards/${cardId}`).then((res) => res.data.foundCard) })
  const removeHashtag = (index: number) => {
    setHashtags((prevHashtags) => prevHashtags.filter((_, i) => i !== index));
  };

  const handleHashtagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event.nativeEvent.isComposing && event.key === 'Enter') {
      event.preventDefault();
      const newHashtag = (event.target as HTMLInputElement).value.trim();

      if (newHashtag && !hashtags.includes(newHashtag)) {
        setHashtags([...hashtags, newHashtag]); // 새 해시태그 추가
        setHashtagInput('');
        setShowDropdown(false);
      }
    }
    setShowDropdown(true);
  };

  const handleHashtagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHashtagInput(event.target.value);
  };

  const onSubmit = (data: Data) => {
    console.log('data: ', data);
    const allData = {
      customFields: data.customFields,
      socialMedia: { instagram: data.instagramId, github: data.githubId, blog: data.blog },
      nickname: data.nickname,
      twitter: data.twitter,
      hashtags: data.hashtags,
      password: data.password,
    };

    // const hook = router.pathname === '/[id]/edit' ? updateCard : createCard;
    // console.log('allData: ', allData);
    // hook(allData, {
    //   onSuccess: (data) => {
    //     router.push(`/${data.data.newCard[0].id}`);
    //   },
    // });

    if (router.pathname === '/[id]/edit') {
      updateCard(
        {
          cardId: cardId as string,
          allData,
        },
        {
          onSuccess: (data) => {
            console.log('update 성공');
            console.log('data.data[0].id: ', data.data[0].id);
            router.push(`/${data.data[0].id}`);
          },
        },
      );
    } else if (router.pathname === '/default/edit') {
      createCard(allData, {
        onSuccess: (data) => {
          console.log('create 성공');
          router.push(`/${data.data.newCard[0].id}`);
        },
      });
    }
  };

  const requiredSentence = <p>필수 문항입니다.</p>;
  // const renderError = (error?: ErrorObject) => error.message && <p>{error.message}</p>

  const nickname = watch('nickname');
  const twitter = watch('twitter');
  const instagramId = watch('instagramId');
  const githubId = watch('githubId');
  const blog = watch('blog');
  const hashtag = watch('hashtags');

  const Dropdown = () =>
    hashtagInput && (
      <ul className="p-2 shadow w-full max-w-xs menu dropdown-content z-[1] bg-base-100 rounded-box">
        <li>
          <div className="badge badge-outline flex items-center justify-center">#{hashtagInput}</div>
        </li>
      </ul>
    );

  return (
    <div className="pb-12">
      <div className="card glass bg-white shadow-md aspect-nameCard">
        <div className="card-body">
          <h1>{nickname}</h1>
          <div>{twitter ? `@${twitter}` : ''}</div>
          <div>{hashtags}</div>
          <div>{instagramId}</div>
          <div>{githubId}</div>
          <div>{blog}</div>
          <div>{hashtag}</div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-5 gap-10">
        {/* maxLength는 임시값 */}
        <fieldset>
          <legend className="font-bold">명함정보</legend>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">닉네임</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input w-full max-w-xs shadow-sm"
              {...register('nickname', { required: true })}
              name="nickname"
            />
            <div className="label">
              <span className="label-text text-red-500 font-semibold">{errors.twitter && requiredSentence}</span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">트위터 아이디</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input w-full max-w-xs shadow-sm"
              {...register('twitter', { required: true })}
              name="twitterId"
            />
            <div className="label">
              <span className="label-text text-red-500 font-semibold"> {errors.twitter && requiredSentence}</span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">해시태그</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input w-full max-w-xs shadow-sm"
              value={hashtagInput}
              {...register('hashtags')}
              onChange={handleHashtagInputChange}
              onKeyDown={handleHashtagInputKeyDown}
              name="hashtag"
            />
            {showDropdown && <Dropdown />}
            <div className="flex flex-wrap gap-2 mt-2">
              {hashtags?.map((hashtag, index) => (
                <div
                  className="badge border-none bg-slate-100 text-slate-400 flex items-center justify-center"
                  key={index}
                >
                  #{hashtag}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current cursor-pointer"
                    onClick={() => removeHashtag(index)}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              ))}
            </div>
            <div className="label">
              <span className="label-text text-red-500 font-semibold"> {errors.hashtag && requiredSentence}</span>
            </div>
          </label>
        </fieldset>
        <fieldset className="flex flex-col">
          <legend className="font-bold">소셜 미디어</legend>
          <label>
            <div className="label">
              <span className="label-text">인스타그램</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input w-full max-w-xs shadow-sm"
              {...register('instagramId')}
              name="instagramId"
            />
          </label>
          <label>
            <div className="label">
              <span className="label-text">깃허브</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input w-full max-w-xs shadow-sm"
              {...register('githubId')}
              name="githubId"
            />
          </label>
          <label>
            <div className="label">
              <span className="label-text">블로그</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input w-full max-w-xs shadow-sm"
              {...register('blog')}
              name="blog"
            />
          </label>
        </fieldset>
        <fieldset>
          <legend className="font-bold">자유 형식</legend>
          {watch('customFields')?.map((_, index) => (
            <div className="flex flex-col gap-2 my-2" key={index}>
              <label>
                <input
                  type="text"
                  placeholder="자유형식 제목"
                  className="input w-full shadow-sm placeholder:text-sm"
                  {...register(`customFields.${index}.key`)}
                />
              </label>
              <label>
                <textarea
                  placeholder="자유형식 내용"
                  className="min-h-24 resize-y textarea shadow-sm w-full placeholder:text-sm"
                  {...register(`customFields.${index}.contents`)}
                />
              </label>
            </div>
          ))}
        </fieldset>
        <button
          type="button"
          className="w-full h-12 mt-2 bg-primary text-white hover:brightness-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center items-center mb-2"
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
export default CardForm;
