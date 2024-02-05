import { ReactNode, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

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

  const Dropdown = () =>
    hashtagInput && (
      <ul className="p-2 shadow w-full max-w-xs menu dropdown-content z-[1] bg-base-100 rounded-box">
        <li>
          <div className="badge badge-outline flex items-center justify-center">#{hashtagInput}</div>
        </li>
      </ul>
    );

  const FreeItem = ({ index }: FreeItemProp) => {
    const item = freeItemData.filter((item) => item.id === index - 1);
    return (
      <div className="flex flex-col gap-2 my-2">
        <input
          type="text"
          placeholder="자유항목 제목"
          className="input w-full shadow-sm placeholder:text-sm"
          value={item.title}
          onChange={(e) =>
            setFreeItemData((prevData) =>
              prevData.map((item) => (item.id === index ? { ...item, title: e.target.value } : item)),
            )
          }
        />
        <textarea
          value={item.content}
          onChange={(e) =>
            setFreeItemData((prevData) =>
              prevData.map((item) => (item.id === index ? { ...item, content: e.target.value } : item)),
            )
          }
          className="min-h-24 resize-y textarea shadow-sm"
          placeholder="자유항목 내용"
        ></textarea>
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
      <div className="card glass bg-white shadow-md aspect-nameCard">
        <div className="card-body">
          <h1>{nickname}</h1>
          <div>{twitterId ? `@${twitterId}` : ''}</div>
          <div>{hashtag}</div>
          <div>{instagramId}</div>
          <div>{githubId}</div>
          <div>{blog}</div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-5">
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
              {...register('nickname', { required: true, maxLength: 10 })}
              name="nickname"
            />
            <div className="label">
              <span className="label-text text-red-500 font-semibold">{errors.twitterId && requiredSentence}</span>
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
              {...register('twitterId', { required: true, maxLength: 10 })}
              name="twitterId"
            />
            <div className="label">
              <span className="label-text text-red-500 font-semibold"> {errors.twitterId && requiredSentence}</span>
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
              {...register('hashtag', { required: true, maxLength: 10 })}
              onChange={handleHashtagInputChange}
              onKeyDown={handleHashtagInputKeyDown}
              name="hashtag"
            />
            {showDropdown && <Dropdown />}
            <div className="flex flex-wrap gap-2 mt-2">
              {hashtags.map((hashtag, index) => (
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
              {...register('instagramId', { maxLength: 10 })}
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
              {...register('githubId', { maxLength: 10 })}
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
              {...register('blog', { maxLength: 10 })}
              name="blog"
            />
          </label>
        </fieldset>
        <fieldset className="flex flex-col">
          <legend className="font-bold pt-5 pb-2">자유항목</legend>
          {freeItems}
          <button
            type="button"
            className="w-full h-10 mt-2 bg-primary text-white hover:brightness-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center items-center mb-2"
            onClick={addFreeItem}
          >
            자유형식 항목 추가하기
          </button>
          <button
            type="submit"
            className="btm-nav btm-nav-md max-w-[512px] mx-auto z-20 bg-accent text-white font-bold"
          >
            저장하기
          </button>
        </fieldset>
      </form>
    </div>
  );
};

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;

export default Page;
