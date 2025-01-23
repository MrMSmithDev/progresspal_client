import React from 'react';
import { AuthProvider } from '@hooks/useAuth';
import { AppProps } from 'next/app';

import '@styles/reset.scss';
import { ModalProvider } from '@hooks/useModal';

function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <ModalProvider>
        <AuthProvider>
          <Component {...pageProps} />;
        </AuthProvider>
      </ModalProvider>
    </React.StrictMode>
  );
}

export default App;
