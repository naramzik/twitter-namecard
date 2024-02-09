import '@/styles/globals.css';

import NiceModal from '@ebay/nice-modal-react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { NextPageWithLayout } from '@/types';
import { showToastErrorMessage } from '@/utils/showToastMessage';
import type { AppProps } from 'next/app';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

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
      <NiceModal.Provider>{getLayout(<Component {...pageProps} />)}</NiceModal.Provider>
    </QueryClientProvider>
  );
}
