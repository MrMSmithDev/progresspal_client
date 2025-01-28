import { mainLogo } from '@assets/images';
import { ThemeToggle } from '@components/buttons';
import { SignInForm } from '@components/forms';
import { useAuth } from '@hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const SignIn: React.FC = () => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) router.push('/dashboard');
  }, [token]);

  return (
    <main className="flex justify-center w-full ">
      <div className="home-background-img absolute top-0 left-0 right-0 bottom-0"></div>
      <div className="relative flex flex-col shadow-md rounded items-center w-100 m-4 p-4 bg-secondary-background dark:bg-secondary-background-dark">
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
        <SignInForm />
        <p className="text-xs dark:text-gray-100 mb-4">
          Don't have an account yet?
        </p>
        <Link
          className="text-sm mb-4 inline-block dark:text-gray-100 rounded border-solid border-2 border-primary py-1 px-3 tracking-wider "
          href="/"
        >
          Sign up
        </Link>
      </div>
    </main>
  );
};

export default SignIn;
