import axios from 'axios';
export const instanceUrls = (process.env.NITTER_HOST ?? '').split(';');

export default async function switchCrawler(param: string | null, currentInstanceIndex = 0) {
  const USER_AGENT =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1';

  try {
    const response = await axios.get(instanceUrls[currentInstanceIndex] + param, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });
    return { data: response.data, instanceUrl: instanceUrls[currentInstanceIndex] };
  } catch (error) {
    return switchCrawler(param, (currentInstanceIndex + 1) % instanceUrls?.length);
  }
}
