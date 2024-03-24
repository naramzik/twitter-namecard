import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  description?: string;
}

export default function SEO({ title, description }: Props) {
  const router = useRouter();

  const pageTitle = title ? `${title} | 트위터 명함` : '트위터 명함';
  const pageDescription = description || '나만의 트위터 명함을 만들고 공유해보아요! 🐥';
  const pageUrl = 'https://twitter-namecard.vercel.app' + router.asPath;
  const pageImage = '/image/naramzik-namecard.png';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@naramzik" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
    </Head>
  );
}
