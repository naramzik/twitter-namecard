import axios from 'axios';
export const instanceUrls = (process.env.NITTER_HOST ?? '').split(';');
export let currentInstanceIndex = 0;

export default async function switchCrawler(param: string | null) {
  const USER_AGENT =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1';
  try {
    const response = await axios.get(instanceUrls[currentInstanceIndex] + param, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });
    return response;
  } catch (error) {
    currentInstanceIndex = (currentInstanceIndex + 1) % instanceUrls?.length;
    console.error(error);
    return switchCrawler(param);
  }
}
