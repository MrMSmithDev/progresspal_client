import React, { useEffect } from 'react';
import { AuthProvider } from '@hooks/useAuth';
import { ModalProvider } from '@hooks/useModal';
import { AppProps } from 'next/app';

import '@styles/globals.css';
import '@styles/reset.css';
import useTheme from '@hooks/useTheme';

function App({ Component, pageProps }: AppProps) {

    useEffect(() => {
        document.body.classList.add('bg-background', 'dark:bg-background-dark');
    }, [])

  return (
    <React.StrictMode>
      <ModalProvider>
        <AuthProvider>
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
