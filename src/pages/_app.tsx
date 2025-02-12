import React, { useEffect } from 'react';
import { AuthProvider } from '@hooks/useAuth';
import { ModalProvider } from '@hooks/useModal';
import { AppProps } from 'next/app';

import '@styles/globals.css';
import '@styles/reset.css';
function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList.add('bg-background', 'dark:bg-background-dark');
  }, []);

  return (
    <React.StrictMode>
      <ModalProvider>
        <AuthProvider>
          <div className="home-bg-img bg-center bg-cover fixed top-0 left-0 right-0 bottom-0 -z-1"></div>
          <Component
            className="bg-background dark:bg-background-dark"
            {...pageProps}
          />
        </AuthProvider>
      </ModalProvider>
    </React.StrictMode>
  );
}

export default App;
