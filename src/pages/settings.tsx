import { Header } from '@components/index';
import {
  GenericButton,
  SignOutButton,
  ThemeToggle,
  UnitSelectorButtons,
} from '@components/buttons';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import { UpdateEmailForm, UpdatePasswordForm } from '@components/forms';
import Link from 'next/link';

const SettingsPage: React.FC = () => {
  const [passwordFormIsActive, setPasswordFormIsActive] =
    useState<boolean>(false);
  const [emailFormIsActive, setEmailFormIsActive] = useState<boolean>(false);

  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/');
  }, [token]);

  function toggleEmailForm() {
    setEmailFormIsActive(!emailFormIsActive);
  }

  function togglePasswordForm() {
    setPasswordFormIsActive(!passwordFormIsActive);
  }

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center w-full p-2 flex-grow pt-[60px]">
        <div className="w-100 p-4 mt-4 shadow-md rounded mr-auto ml-auto bg-secondary-background dark:bg-secondary-background-dark flex flex-col justify-start items-center">

          <div className="flex flex-col items-center w-full mb-4">
            <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
              Set theme
            </label>
            <ThemeToggle />
          </div>
          <div className="text-center w-full mb-4">
            <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold">
              Set units
            </label>
            <UnitSelectorButtons />
          </div>
          <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
            Account settings
          </label>
          <p className="ms-2 mb-4 text-xs font-medium text-gray-900 dark:text-gray-300">
            Read the{' '}
            <Link
              href="/terms-and-conditions"
              className="text-blue-500 hover:underline"
            >
              Terms and conditions
            </Link>
          </p>
          <div className="w-full mb-2">
            <GenericButton
              func={toggleEmailForm}
              text="Update email"
              inset={emailFormIsActive}
            />
            {emailFormIsActive && (
              <UpdateEmailForm closeForm={toggleEmailForm} />
            )}
          </div>
          <div className="w-full mb-4">
            <GenericButton
              func={togglePasswordForm}
              text="Update password"
              inset={passwordFormIsActive}
            />
            {passwordFormIsActive && (
              <UpdatePasswordForm closeForm={togglePasswordForm} />
            )}
          </div>
          <SignOutButton />
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
