import { isEmpty, noop } from 'lodash-es';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useGetTwitterInfo } from '@/hooks/queries/useGetTwitterInfo';
import { CardType } from '@/types/cards';
import { FormLabel } from '../form/FormLabel';
import { Password } from '../form/Password';
import { TextArea } from '../form/TextArea';
import { TextField } from '../form/TextField';
import NameCard from './NameCard';

interface CardFormData extends CardType {
  hashtag: string;
  passwordCheck: string;
  twitterProfile: string;
}

interface CardFormProps {
  card?: CardType;
  onSubmit: (data: CardFormData) => void;
}

const CardForm = ({ card, onSubmit = noop }: CardFormProps) => {
  const {
    watch,
    setValue,
    setError,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormData>({
    defaultValues: card,
    reValidateMode: 'onChange',
  });

  const [twitterHandle, setTwitterHandle] = useState<string>('');
  const { isSuccess, isLoading, data: twitterInfo } = useGetTwitterInfo({ twitterId: twitterHandle });

  useEffect(
    function updateTwitterInfo() {
      if (isSuccess && twitterInfo) {
        clearErrors('twitter');
        clearErrors('nickname');

        setValue('nickname', twitterInfo.nickname);
        setValue('bio', twitterInfo.bio);
        setValue('image_url', twitterInfo.image);
        setValue('twitterProfile', twitterInfo.image);
      }
    },
    [clearErrors, isSuccess, setValue, twitterInfo],
  );

  function handleFormError() {
    toast.error('올바르지 않은 입력값이 있어요.');
  }

  function handleAddCustomField() {
    const customFields = watch('customFields') ?? [];
    setValue('customFields', [...customFields, { id: nanoid(4), key: '', contents: '' }]);
  }

  const handleDeleteCustomField = (index: number) => () => {
    const customFields = watch('customFields') ?? [];
    setValue(
      'customFields',
      customFields.filter((_, i) => i !== index),
    );
  };

  function addHashtag(hashtag: string) {
    const hashtags = watch('hashtags') ?? [];

    if (!hashtag) {
      setError('hashtag', { message: '태그를 입력해주세요' });
      return;
    }

    if (hashtag.length > 15) {
      setError('hashtag', { message: '태그는 15자 이내로 입력해주세요' });
      return;
    }

    if (hashtags.includes(hashtag)) {
      setError('hashtag', { message: '이미 입력된 태그 입니다.' });
      return;
    }

    if (hashtags.length >= 5) {
      setError('hashtag', { message: '태그는 5개까지만 입력할 수 있습니다.' });
      return;
    }

    setValue('hashtag', '');
    setValue('hashtags', [...hashtags, hashtag.replace(/[#]/g, '').replace(/\s/g, '_')]);
  }

  const removeHashtag = (index: number) => () => {
    const hashtags = watch('hashtags') ?? [];
    setValue(
      'hashtags',
      hashtags.filter((_, i) => i !== index),
    );
  };

  const isCreateMode = isEmpty(card);

  return (
    <div className="pb-12">
      <form onSubmit={handleSubmit(onSubmit, handleFormError)} className="flex flex-col gap-8 py-5">
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">명함 미리보기</h2>
          <NameCard
            twitterNickname={watch('nickname')}
            twitterId={watch('twitter')}
            twitterBio={watch('bio')}
            twitterImage={watch('image_url') ?? '/images/profile.jpg'}
            hashtags={watch('hashtags')}
            instagramId={watch('socialMedia.instagram')}
            githubId={watch('socialMedia.github')}
            blog={watch('socialMedia.blog')}
          />
        </section>
        {isCreateMode && (
          <section className="flex flex-col gap-4">
            <h2 className="font-bold text-xl">비밀번호</h2>
            <FormLabel required label="비밀번호" errorMessage={errors.password?.message}>
              <Password
                {...register('password', { required: '필수 문항입니다.' })}
                autoComplete="new-password"
                placeholder="비밀번호를 입력해주세요"
              />
            </FormLabel>
            <FormLabel label="비밀번호 확인" required errorMessage={errors.passwordCheck?.message}>
              <Password
                {...register('passwordCheck', {
                  required: '필수 문항입니다.',
                  validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
                })}
                autoComplete="new-password"
                placeholder="비밀번호를 한번 더 입력해주세요"
              />
            </FormLabel>
          </section>
        )}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">프로필 작성하기</h2>
          <FormLabel required label="트위터 아이디" errorMessage={errors.twitter?.message}>
            <div className="flex gap-2">
              <TextField
                {...register('twitter', { required: '필수 문항입니다.' })}
                className="flex-1"
                placeholder="트위터 아이디"
              />
              <button
                type="button"
                disabled={isLoading}
                className="btn btn-primary"
                onClick={function handleLoadTwitterInfo() {
                  setTwitterHandle(watch('twitter'));
                }}
              >
                정보 불러오기
              </button>
            </div>
          </FormLabel>

          <FormLabel required label="프로필 이미지" errorMessage={errors.image_url?.message}>
            <img
              src={watch('image_url') ?? '/images/profile.jpg'}
              alt="프로필 이미지"
              className="w-40 h-40 rounded-md mb-4"
            />
            {/* TODO: 이미지 업로드 기능 추가
            <button type="button" className="btn btn-success text-white btn-sm">
              이미지 업로드
            </button> */}
          </FormLabel>

          <FormLabel required label="닉네임" errorMessage={errors.nickname?.message}>
            <TextField
              {...register('nickname', { required: '필수 문항입니다.' })}
              placeholder="닉네임을 입력해주세요"
              readOnly={isCreateMode && !isSuccess}
            />
          </FormLabel>

          <FormLabel label="바이오" errorMessage={errors.bio?.message}>
            <TextArea
              {...register('bio')}
              placeholder="바이오를 입력해주세요"
              rows={7}
              readOnly={isCreateMode && !isSuccess}
            />
          </FormLabel>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">태그</h2>
          <FormLabel required label="태그" errorMessage={errors.hashtag?.message}>
            <div className="flex gap-2">
              <TextField
                {...register('hashtag', {
                  onChange: () => clearErrors('hashtag'),
                })}
                placeholder="태그를 입력해주세요"
                onKeyDown={function handleKeydown(event) {
                  if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
                    event.preventDefault();
                    addHashtag(watch('hashtag'));
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-info"
                onClick={function handleClick() {
                  addHashtag(watch('hashtag'));
                }}
              >
                추가하기
              </button>
            </div>
          </FormLabel>

          <div className="flex flex-wrap gap-2">
            {watch('hashtags')?.map((hashtag, index) => (
              <span
                key={hashtag + index}
                className="border-[1px] border-black rounded-md py-1 px-3 inline-flex gap-2 max-w-full"
              >
                <span className="max-w-full truncate">{hashtag}</span>
                <button type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current cursor-pointer"
                    onClick={removeHashtag(index)}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">SNS</h2>

          <FormLabel label="깃허브" errorMessage={errors.socialMedia?.github?.message}>
            <TextField {...register('socialMedia.github')} placeholder="깃허브 아이디를 입력해주세요" />
          </FormLabel>

          <FormLabel label="인스타그램" errorMessage={errors.socialMedia?.instagram?.message}>
            <TextField {...register('socialMedia.instagram')} placeholder="인스타그램 아이디를 입력해주세요" />
          </FormLabel>

          <FormLabel label="URL" errorMessage={errors.socialMedia?.blog?.message}>
            <TextField {...register('socialMedia.blog')} placeholder="웹사이트 주소를 입력해주세요" />
          </FormLabel>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">추가 정보</h2>

          {watch('customFields')?.map((customField, index) => (
            <article key={customField.id} className="flex flex-col gap-2 flex-1">
              <div className="flex gap-2">
                <TextField {...register(`customFields.${index}.key`)} placeholder={'제목을 입력해주세요'} />
                <button
                  onClick={handleDeleteCustomField(index)}
                  type="button"
                  className="btn btn-ghost hover:bg-slate-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>

              <TextArea {...register(`customFields.${index}.contents`)} placeholder={'내용을 입력해주세요'} rows={3} />
            </article>
          ))}

          <button onClick={handleAddCustomField} type="button" className="btn btn-ghost hover:bg-slate-300">
            <Image width={22} height={22} src="/images/add.png" alt="추가" />
          </button>
        </section>

        <button type="submit" className="btn btn-accent text-white font-bold w-full">
          저장하기
        </button>
      </form>
    </div>
  );
};
export default CardForm;
