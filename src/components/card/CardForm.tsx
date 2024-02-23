import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { useCreateCard } from '@/hooks/queries/useCreateCard';
import { useUpdateCard } from '@/hooks/queries/useUpdateCard';
import { selectedCardIdState } from '@/store/cardId';
import { showToastPromiseMessage, showToastSuccessMessage } from '@/utils/showToastMessage';

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
  passwordCheck: string;
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
  const [hashtagList, setHashtagList] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isTwitterFieldVisible, setIsTwitterFieldVisible] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const requiredSentence = <p>필수 문항입니다.</p>;
  // const renderError = (error?: ErrorObject) => error.message && <p>{error.message}</p>
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false);
  const [isPasswordDifferent, setIsPasswordDifferent] = useState(false);
  const setSelectedCardId = useSetRecoilState(selectedCardIdState);

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
              setHashtagList(res.data.foundCard.hashtags);
              const { socialMedia, ...rest } = res.data.foundCard;
              return {
                ...rest,
                blog: socialMedia.blog,
                githubId: socialMedia.github,
                instagramId: socialMedia.instagram,
              };
            }),
  });

  const twitterNickname = watch('twitterNickname');
  const twitterId = watch('twitterId');
  const twitterBio = watch('twitterBio');
  const twitterImage = watch('twitterImage');
  const instagramId = watch('instagramId');
  const githubId = watch('githubId');
  const blog = watch('blog');
  const password = watch('password');
  const passwordCheck = watch('passwordCheck');
  const { ref: registerRef, ...rest } = register('twitterImage');

  const removeHashtag = (index: number) => {
    setHashtagList((prevHashtags) => prevHashtags.filter((_, i) => i !== index));
  };

  const handleHashtagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event.nativeEvent.isComposing && event.key === 'Enter') {
      event.preventDefault();
      const newHashtag = (event.target as HTMLInputElement).value.trim();

      if (newHashtag && !hashtagList.includes(newHashtag)) {
        setHashtagList([...hashtagList, newHashtag]); // 새 해시태그 추가
        setHashtagInput('');
        setShowDropdown(false);
      }
    }
    setShowDropdown(true);
  };

  const handleHashtagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHashtagInput(event.target.value);
  };

  const submitHandler = (data: Data) => {
    const allData = {
      customFields: data.customFields,
      socialMedia: { instagram: data.instagramId, github: data.githubId, blog: data.blog },
      nickname: data.twitterNickname,
      twitter: data.twitterId,
      bio: data.twitterBio,
      // image_url: data.twitterImage,
      hashtags: hashtagList,
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
            showToastSuccessMessage('명함이 수정되었어요!');
          },
        },
      );
    } else if (router.pathname === '/default/edit') {
      createCard(allData, {
        onSuccess: (data) => {
          setSelectedCardId(data.data.newCard[0].id);
          router.push(`/${data.data.newCard[0].id}`);
          showToastSuccessMessage('명함을 만드는데 성공했어요!');
        },
      });
    }
  };

  const searchHandler = async () => {
    const message = {
      loading: '트위터 프로필을 불러오고 있어요.',
      success: '프로필을 성공적으로 불러왔어요!',
    };

    const fetchTwitterInfo = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/twitter-info/${twitterId}`);
      setValue('twitterNickname', res.data.nickname);
      setValue('twitterBio', res.data.bio);
      setValue('twitterImage', res.data.image);
      showTwitterField();
      return res.data;
    };

    showToastPromiseMessage(fetchTwitterInfo(), message);
  };

  const showTwitterField = () => {
    setIsTwitterFieldVisible(true);
  };

  const Dropdown = () =>
    hashtagInput && (
      <ul className="p-2 shadow w-full max-w-xs menu dropdown-content z-[1] bg-base-100 rounded-box">
        <li>
          <div className="badge badge-outline flex items-center justify-center">#{hashtagInput}</div>
        </li>
      </ul>
    );

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 업로드한 파일 가져오기
    const file = e.target.files?.[0];

    // 파일을 로컬에서 url로 변환
    // TODO: 서버에 프로필 파일 업로드해서 URL 받아오기
    if (file) {
      const binaryData = [file];
      const urlImage = URL.createObjectURL(new Blob(binaryData, { type: 'image' }));

      // 이미지 URL을 src로 설정
      setValue('twitterImage', urlImage);
    }
  };

  return (
    <div className="pb-12">
      <div className="card glass bg-white shadow-md aspect-nameCard">
        <div className="card-body">
          <h1>{twitterNickname}</h1>
          <div>{twitterId ? `@${twitterId}` : ''}</div>
          <div>{twitterBio}</div>
          <div>{twitterImage}</div>
          <div>{hashtagList}</div>
          <div>{instagramId}</div>
          <div>{githubId}</div>
          <div>{blog}</div>
        </div>
      </div>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col py-5 gap-8">
        <fieldset>
          <legend className="font-bold">
            비밀번호<span className="text-xs font-normal text-red-500 ml-1">*</span>
          </legend>
          <label className="form-control w-full max-w-xs mt-2">
            <div className="label">
              <span className="label-text">비밀번호</span>
            </div>
            <div className="flex h-10 relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="비밀번호를 입력해 주세요."
                className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
                {...register('password', { required: true })}
                name="password"
              />
              <button
                type="button"
                className="h-10 absolute top-0 right-2"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                <Image
                  width={22}
                  height={22}
                  src={isPasswordVisible ? '/hide.png' : '/view.png'}
                  alt={isPasswordCheckVisible ? '숨김' : '보임'}
                />
              </button>
            </div>
            {errors.password && (
              <div className="label pt-0.5">
                <span className="label-text text-red-500 ">{requiredSentence}</span>
              </div>
            )}
          </label>
          <label className="form-control w-full max-w-xs mt-2">
            <div className="label">
              <span className="label-text">비밀번호 확인</span>
            </div>
            <div className="flex h-10 relative">
              <input
                type={isPasswordCheckVisible ? 'text' : 'password'}
                placeholder="비밀번호를 한 번 더 입력해주세요."
                className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
                {...register('passwordCheck', { required: true })}
                name="passwordCheck"
              />
              <button
                type="button"
                className="h-10 absolute top-0 right-2"
                onClick={() => setIsPasswordCheckVisible((prev) => !prev)}
              >
                {isPasswordCheckVisible ? (
                  <Image width={22} height={22} src="/hide.png" alt="숨김" />
                ) : (
                  <Image width={22} height={22} src="/view.png" alt="보임" />
                )}
              </button>
            </div>
            {errors.passwordCheck && (
              <div className="label pt-0.5">
                <span className="label-text text-red-500 ">{requiredSentence}</span>
              </div>
            )}

            {password !== passwordCheck && !!passwordCheck && (
              <div className="label pt-0.5">
                <span className="label-text text-red-500 ">비밀번호가 일치하지 않습니다.</span>
              </div>
            )}
          </label>
        </fieldset>
        <fieldset>
          <legend className="font-bold">
            프로필 가져오기 <span className="text-xs text-red-500 ml-1">*</span>
          </legend>
          <div className="relative max-w-xs">
            <input
              type="text"
              placeholder="트위터 아이디를 입력해 주세요."
              className="input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
              {...register('twitterId', { required: true })}
              name="twitterId"
            />
            <Image
              onClick={searchHandler}
              className="absolute top-2.5 right-3"
              width={20}
              height={20}
              src="/search.png"
              alt="검색"
            />
          </div>
          {errors.twitterId && (
            <div className="label pt-0.5">
              <span className="label-text text-red-500 ">{requiredSentence}</span>
            </div>
          )}
        </fieldset>
        {isTwitterFieldVisible && (
          <fieldset>
            <legend className="font-bold">프로필</legend>
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
                <span className="label-text">자기소개</span>
              </div>
              <textarea
                className="textarea w-full max-w-xs shadow-sm h-28 placeholder:text-xs"
                placeholder=""
                {...register('twitterBio')}
              />
            </label>
            <div className="form-control w-full max-w-xs">
              <label className="label pb-0.5">
                <span className="label-text">
                  <b>이미지</b>
                </span>
              </label>
              {twitterImage && <img src={twitterImage} alt="프로필 이미지" className="w-40 h-40" />}
              <input
                {...rest}
                type="file"
                ref={(e) => {
                  registerRef(e);
                  hiddenInputRef.current = e;
                }}
                placeholder=""
                className="hidden input h-10 w-full max-w-xs shadow-sm placeholder:text-xs"
                name="twitterImage"
                onChange={fileUploadHandler}
              />
              <button
                type="button"
                className="btn btn-success text-white btn-sm text-xs w-1/2 mt-1"
                onClick={() => {
                  hiddenInputRef.current?.click();
                }}
              >
                이미지 변경하기
              </button>
            </div>
          </fieldset>
        )}
        <fieldset>
          <legend className="font-bold">해시태그</legend>
          <label className="form-control w-full max-w-xs mt-2">
            <input
              type="text"
              placeholder="엔터를 쳐서 태그를 저장할 수  있어요."
              className="input h-10 w-full max-w-xs shadow-s placeholder:text-xs"
              value={hashtagInput}
              onChange={handleHashtagInputChange}
              onKeyDown={handleHashtagInputKeyDown}
            />
            {showDropdown && <Dropdown />}
            <div className="flex flex-wrap gap-2 mt-2">
              {hashtagList?.map((hashtag, index) => (
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
          <div className="flex flex-col gap-2">
            <label className="flex flex-row gap-3 form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">인스타그램 아이디</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input h-10 w-1/2 max-w-xs shadow-sm placeholder:text-xs"
                {...register('instagramId')}
                name="instagramId"
              />
            </label>
            <label className="form-control gap-3 flex flex-row  w-full max-w-xs">
              <div className="label">
                <span className="label-text">깃허브 아이디</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input w-1/2 h-10 max-w-xs shadow-sm placeholder:text-xs"
                {...register('githubId')}
                name="githubId"
              />
            </label>
            <label className="form-control gap-3 flex flex-row  w-full max-w-xs">
              <div className="label">
                <span className="label-text">블로그 주소</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input h-10 w-2/3 max-w-xs shadow-sm placeholder:text-xs"
                {...register('blog')}
                name="blog"
              />
            </label>
          </div>
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
                  type="button"
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
          <Image
            onClick={() => setValue('customFields', [...watch('customFields'), { key: '', contents: '' }])}
            width={22}
            height={22}
            src="/add.png"
            alt="추가"
            className="mx-auto cursor-pointer"
          />
        </fieldset>

        <button
          type="submit"
          className="btn my-4 w-full btn-accent max-w-[512px] mx-auto bg-accent text-white font-bold"
        >
          저장하기
        </button>
      </form>
    </div>
  );
};
export default CardForm;
