import '@/styles/globals.css';

import NiceModal from '@ebay/nice-modal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextPageWithLayout } from '@/types';
import type { AppProps } from 'next/app';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>{getLayout(<Component {...pageProps} />)}</NiceModal.Provider>
    </QueryClientProvider>
  );
}
