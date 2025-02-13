import React from 'react';
import { Header } from '@components/index';
import { useAuth } from '@hooks/useAuth';
import Link from 'next/link';

const NotFound: React.FC = () => {
  const { token } = useAuth();

  return (
    <>
      {token ? <Header /> : null}
      <main className="flex justify-center items-center w-full h-[100lvh]">
        <div className="relative flex flex-col shadow-md rounded items-center w-100 m-4 p-4 bg-secondary-background dark:bg-secondary-background-dark">
          <h1 className="text-4xl tracking-wider dark:text-gray-100">404</h1>
          <p className="text-xl dark:text-gray-100 mb-3">Page not found</p>
          {token ? (
            <Link
              href="/dashboard"
              className="text-sm mb-4 dark:text-gray-100 inline-block rounded border-solid border-2 border-primary py-1 px-3 tracking-wider"
            >
              Go home
            </Link>
          ) : (
            <div className="flex gap-3 mt-3">
              <Link
                href="/"
                className="text-sm mb-4 dark:text-gray-100 inline-block rounded border-solid border-2 border-primary py-1 px-3 tracking-wider"
              >
                Sign up
              </Link>
              <span>or</span>
              <Link
                href="/signin"
                className="text-sm mb-4 dark:text-gray-100 inline-block rounded border-solid border-2 border-primary py-1 px-3 tracking-wider"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default NotFound;
