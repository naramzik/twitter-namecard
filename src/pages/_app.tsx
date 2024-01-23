import '@/styles/globals.css';

import NiceModal from '@ebay/nice-modal-react';
import { NextPageWithLayout } from '@/types';
import type { AppProps } from 'next/app';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <NiceModal.Provider>{getLayout(<Component {...pageProps} />)}</NiceModal.Provider>;
}
