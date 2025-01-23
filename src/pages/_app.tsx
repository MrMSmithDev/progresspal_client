import React from 'react';
import { AuthProvider } from '@hooks/useAuth';
import { ModalProvider } from '@hooks/useModal';
import { AppProps } from 'next/app';

import '@styles/reset.css';
import '@styles/global.css';

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
