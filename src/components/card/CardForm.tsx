import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCard } from '@/hooks/queries/useCreateCard';
import { useUpdateCard } from '@/hooks/queries/useUpdateCard';

interface Data {
  twitterNickname: string;
  twitterId: string;
  twitterBio: string;
  twitterImage: string;
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
            twitterNickname: '',
            twitterId: '',
            twitterBio: '',
            twitterImage: '',
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
      nickname: data.twitterNickname,
      twitter: data.twitterId,
      bio: data.twitterBio,
      image: data.twitterImage,
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

  const twitterNickname = watch('twitterNickname');
  const twitterId = watch('twitterId');
  const twitterBio = watch('twitterBio');
  const twitterImage = watch('twitterImage');
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
          <h1>{twitterNickname}</h1>
          <div>{twitterId ? `@${twitterId}` : ''}</div>
          <div>{twitterBio}</div>
          <div>{twitterImage}</div>
          <div>{hashtags}</div>
          <div>{instagramId}</div>
          <div>{githubId}</div>
          <div>{blog}</div>
          <div>{hashtag}</div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-5 gap-8">
        <fieldset>
          <legend className="font-bold">
            비밀번호<span className="text-xs font-normal text-red-500 ml-1">*</span>
          </legend>
          <label className="form-control w-full max-w-xs mt-2">
            <input
              type="password"
              placeholder="명함을 수정하거나 삭제할 때 필요해요."
              className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
              {...register('password', { required: true })}
              name="password"
            />
            {errors.password && (
              <div className="label pt-0.5">
                <span className="label-text text-red-500 ">{requiredSentence}</span>
              </div>
            )}
          </label>
        </fieldset>

        <fieldset>
          <legend className="font-bold">트위터 정보</legend>
          <label className="form-control w-full max-w-xs">
            <div className="label pb-0.5">
              <span className="label-text">
                트위터 아이디<span className="text-xs text-red-500 ml-1">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
              {...register('twitterId', { required: true })}
              name="twitterId"
            />
            {errors.twitterId && (
              <div className="label pt-0.5">
                <span className="label-text text-red-500 ">{requiredSentence}</span>
              </div>
            )}
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label pb-0.5">
              <span className="label-text">
                닉네임<span className="text-xs text-red-500 ml-1">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
              {...register('twitterNickname', { required: true })}
              name="twitterNickname"
            />
            {errors.twitterNickname && (
              <div className="label pt-0.5">
                <span className="label-text text-red-500">{requiredSentence}</span>
              </div>
            )}
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label pb-0.5">
              <span className="label-text">바이오(자기소개)</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
              {...register('twitterBio', { required: true })}
              name="twitterBio"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label pb-0.5">
              <span className="label-text">인장(프로필 이미지)</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
              {...register('twitterImage', { required: true })}
              name="twitterImage"
            />
          </label>
        </fieldset>

        <fieldset>
          <legend className="font-bold">해시태그</legend>
          <label className="form-control w-full max-w-xs mt-2">
            <input
              type="text"
              placeholder="엔터를 쳐서 저장할 수  있어요."
              className="input h-10 w-full max-w-xs shadow-s placeholder:text-sm placeholder:text-xs"
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
            <div className="label pb-0.5">
              <span className="label-text">인스타그램 아이디</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
              {...register('instagramId')}
              name="instagramId"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label pb-0.5">
              <span className="label-text">깃허브 아이디</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
              {...register('githubId')}
              name="githubId"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label pb-0.5">
              <span className="label-text">블로그</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
              {...register('blog')}
              name="blog"
            />
          </label>
        </fieldset>
        <fieldset>
          <legend className="font-bold">자유형식</legend>
          {watch('customFields')?.map((_, index) => (
            <div key={index} className=" pt-2 pb-4 flex justify-between">
              <div className="flex flex-col w-full">
                <label className="form-control w-full max-w-xs">
                  <input
                    className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs text-sm"
                    type="text"
                    placeholder="제목"
                    {...register(`customFields.${index}.key`)}
                  />
                </label>
                <label className="form-control w-full max-w-xs pt-2">
                  <textarea
                    className="textarea w-full max-w-xs shadow-sm h-28 placeholder:text-xs"
                    placeholder="내용"
                    {...register(`customFields.${index}.contents`)}
                  />
                </label>
              </div>
              <div>
                <button
                  className="text-3xl text-gray-500"
                  onClick={() =>
                    setValue(
                      'customFields',
                      [...watch('customFields')].filter((_, i) => i !== index),
                    )
                  }
                >
                  -
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
