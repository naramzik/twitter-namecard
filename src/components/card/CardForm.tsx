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
        : async () =>
            await axios.get(`/api/cards/${cardId}`).then((res) => {
              const { socialMedia, ...rest } = res.data.foundCard;
              return {
                ...rest,
                blog: socialMedia.blog,
                githubId: socialMedia.github,
                instagramId: socialMedia.instagram,
              };
            }),
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
    const allData = {
      customFields: data.customFields,
      socialMedia: { instagram: data.instagramId, github: data.githubId, blog: data.blog },
      nickname: data.nickname,
      twitter: data.twitter,
      hashtags: data.hashtags,
      password: data.password,
    };

    if (router.pathname === '/[id]/edit') {
      updateCard(
        {
          cardId: cardId as string,
          allData,
        },
        {
          onSuccess: (data) => {
            router.push(`/${data.data[0].id}`);
          },
        },
      );
    } else if (router.pathname === '/default/edit') {
      createCard(allData, {
        onSuccess: (data) => {
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
        <fieldset>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">비밀번호</span>
            </div>
            <input
              type="password"
              placeholder="이후에 명함을 수정, 삭제할 때 필요합니다."
              className="input w-full max-w-xs shadow-sm placeholder:text-sm"
              {...register('password', { required: true })}
              name="password"
            />
            <div className="label">
              <span className="label-text text-red-500 font-semibold">{errors.password && requiredSentence}</span>
            </div>
          </label>
        </fieldset>

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
              <span className="label-text text-red-500 font-semibold">{errors.nickname && requiredSentence}</span>
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
              name="twitter"
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
          </label>
        </fieldset>

        <fieldset>
          <legend className="font-bold">SNS</legend>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">인스타그램 아이디</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input w-full max-w-xs shadow-sm"
              {...register('instagramId')}
              name="instagramId"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">깃허브 아이디</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input w-full max-w-xs shadow-sm"
              {...register('githubId')}
              name="githubId"
            />
          </label>
          <label className="form-control w-full max-w-xs">
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
          <legend className="font-bold">자유형식</legend>
          {watch('customFields')?.map((_, index) => (
            <div key={index} className="pt-2 flex justify-between">
              <div className="flex flex-col w-full">
                <label className="form-control w-full max-w-xs">
                  <input
                    className="input w-full max-w-xs shadow-sm placeholder:text-sm text-sm"
                    type="text"
                    placeholder="제목"
                    {...register(`customFields.${index}.key`)}
                  />
                </label>
                <label className="form-control w-full max-w-xs pt-1">
                  <textarea
                    className="textarea w-full max-w-xs shadow-sm h-28 placeholder:text-sm"
                    placeholder="내용"
                    {...register(`customFields.${index}.contents`)}
                  />
                </label>
              </div>
              <div>
                <button
                  className="text-xl"
                  onClick={() =>
                    setValue(
                      'customFields',
                      [...watch('customFields')].filter((_, i) => i !== index),
                    )
                  }
                >
                  x
                </button>
              </div>
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
