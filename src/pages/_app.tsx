import '@/styles/globals.css';

import NiceModal from '@ebay/nice-modal-react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Nanum_Gothic } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
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

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <NiceModal.Provider>
        <main className={`${single.variable} font-sans`}>{getLayout(<Component {...pageProps} />)}</main>
      </NiceModal.Provider>
    </QueryClientProvider>
  );
}
