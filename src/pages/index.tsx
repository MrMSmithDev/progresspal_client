import React, { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import { SignupForm } from '@components/forms';
import Image from 'next/image';
import { mainLogo } from '@assets/images';
import Link from 'next/link';
import { DemoButton, ThemeToggle } from '@components/buttons';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (token) router.push('/dashboard');
  }, [token]);

  return (
    <main className="flex justify-center w-full">
      <div className="home-background-img fixed top-0 left-0 right-0 bottom-0"></div>
      <div className="relative flex justify-center items-start w-full min-h-screen">
        <div className="relative flex flex-col shadow-md rounded justify-start items-center w-100 m-4 p-4 bg-secondary-background dark:bg-secondary-background-dark">
          <div className="absolute top-2 right-2">
            <ThemeToggle />
          </div>
          <Image
            src={mainLogo}
            height="200"
            width="200"
            alt="Progress Pal Logo"
            className="rounded-lg"
          />
          <h1 className="text-5xl tracking-wider font-delirium text-transparent -mt-11 bg-gradient-to-t from-primary to-green-gradient bg-clip-text">
            Progress Pal
          </h1>
          <SignupForm />
          <p className="text-xs mb-4 dark:text-white">
            Already have an account?
          </p>
          <Link
            className="text-sm mb-4 dark:text-gray-100 inline-block rounded border-solid border-2 border-primary py-1 px-3 tracking-wider"
            href="/signin"
          >
            Sign in
          </Link>
        </div>
        <DemoButton />
      </div>
    </main>
  );
};

export default IndexPage;
