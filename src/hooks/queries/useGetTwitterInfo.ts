import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash-es';
import toast from 'react-hot-toast';
import { get } from '@/libs/axiosInterceptor';

interface TwitterInfoResponse {
  image: string;
  nickname: string;
  bio: string;
}

export function useGetTwitterInfo({ twitterId }: { twitterId: string }) {
  return useQuery({
    queryKey: ['twitterInfo'],
    queryFn: () =>
      toast.promise<TwitterInfoResponse>(
        get(`/api/twitter-info/${twitterId}`, {
          timeout: Infinity,
        }),
        {
          loading: '트위터 정보를 불러오는 중...',
          success: '트위터 정보를 성공적으로 불러왔어요.',
          error: '트위터 정보를 불러오는데 실패했어요.',
        },
      ),
    enabled: !isEmpty(twitterId),
  });
}
