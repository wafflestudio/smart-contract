import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import ReactModal from 'react-modal';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { MetamaskProvider } from '../contexts/metamaskContext';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MetamaskProvider>
        <Component {...pageProps} /> <Toaster />
        <ReactQueryDevtools />
      </MetamaskProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

ReactModal.setAppElement('#__next');
