import React from 'react';
import { AuthProvider } from '@hooks/useAuth';
import { AppProps } from 'next/app';

import '@styles/reset.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Component {...pageProps} />;
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
