import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

interface Props {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export default function SEO({ title, description, imageUrl }: Props) {
  const router = useRouter();

  const pageTitle = title ? `${title} | 트위터 명함` : '트위터 명함';
  const pageDescription = description || '나만의 트위터 명함을 만들고 공유해보아요! 🐥';
  const pageUrl = 'https://twitter-namecard.vercel.app' + router.asPath;
  const pageImage = imageUrl || '/images/naramzik-namecard.png';
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@naramzik" />
      <meta name="twitter:site" content="@naramzik" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
    </Head>
  );
}
