import '@/styles/globals.css';

import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import NiceModal from '@ebay/nice-modal-react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Nanum_Gothic } from 'next/font/google';
import Script from 'next/script';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import * as gtag from '@/libs/gtags';
import { NextPageWithLayout } from '@/types';
import { showToastErrorMessage } from '@/utils/showToastMessage';
import type { AppProps } from 'next/app';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const single = Nanum_Gothic({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-nanum-gothic',
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  gtag.useGtag();
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: showToastErrorMessage,
      },
    },
    queryCache: new QueryCache({
      onError: () => showToastErrorMessage,
    }),
  });

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(function initChannelIO() {
    if (!process.env.NEXT_PUBLIC_CHANNEL_API_KEY) {
      return;
    }

    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_API_KEY,
    });
  }, []);

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <NiceModal.Provider>
            <main className={`${single.variable} font-sans`}>{getLayout(<Component {...pageProps} />)}</main>
          </NiceModal.Provider>
        </QueryClientProvider>
      </RecoilRoot>
      <>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />
      </>
    </>
  );
}
