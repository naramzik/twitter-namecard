import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<Props = Record<string, never>, InitialProps = Props> = NextPage<Props, InitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
