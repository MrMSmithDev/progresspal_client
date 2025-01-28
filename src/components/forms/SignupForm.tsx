import { SubmitButton } from '@components/buttons';
import { useAuth } from '@hooks/useAuth';
import { useModal } from '@hooks/useModal';
import { fetchData } from '@utils/api';
import Link from 'next/link';
import React, { useState } from 'react';

interface SignupResponse {
  message: string;
  id: string;
  token: string;
  username: string;
}

const SignupForm: React.FC = () => {
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [target, setTarget] = useState<number>(0);
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);

  const { setToken, setUsername } = useAuth();
  const { openModal } = useModal();

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUsernameInput(e.currentTarget.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmailInput(e.currentTarget.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPasswordInput(e.currentTarget.value);
  }

  function handlePasswordRepeatChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setPasswordRepeat(e.currentTarget.value);
  }

  function handleTargetChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const targetNum = parseInt(e.currentTarget.value);
    setTarget(targetNum);
  }

  function handleTermsChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setAgreedTerms(e.currentTarget.checked)
    console.log(agreedTerms);
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!agreedTerms) {
      return openModal('Please confirm you agree with the terms and conditions')
    }

    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
        passwordRepeat,
        target,
      }),
    };

    const data = (await fetchData(
      '/user/signup',
      reqOptions
    )) as SignupResponse;
    if (!data.token) {
      openModal('Error signing up: Please try again later');
    } else {
      setToken(data.token);
      setUsername(data.username);
    }
  }

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col items-center pt-6 pb-4 w-full"
    >
      <div className="pb-3 inline-block w-full">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          onChange={handleUsernameChange}
          placeholder="Username"
        />
      </div>

      <div className="pb-3 inline-block w-full">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="username"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-input dark:bg-input-dark focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          onChange={handleEmailChange}
          placeholder="email@example.com"
        />
      </div>

      <div className="pb-3 inline-block w-full">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          onChange={handlePasswordChange}
          placeholder="Password"
        />
      </div>

      <div className="pb-3 inline-block w-full">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="passwordRepeat"
        >
          Repeat password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="passwordRepeat"
          type="password"
          onChange={handlePasswordRepeatChange}
          placeholder="Repeat password"
        />
      </div>

      <div className="pb-3 inline-block w-full">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="target"
        >
          Target
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="target"
          type="number"
          onChange={handleTargetChange}
          placeholder="0"
          min="0"
          max="28"
        />
        <p className="text-xs">
          How many times would you like to work out a month? (0 - 28)
        </p>
      </div>
      <div className="flex items-center pb-3">
        <input
          id="terms-agreement"
          type="checkbox"
          onChange={handleTermsChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
        />
        <label
          htmlFor="terms-agreement"
          className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300"
        >
          I agree to the <Link href="/terms-and-conditions" className="text-blue-500 hover:underline">Terms and conditions</Link>
        </label>
      </div>
      <SubmitButton func={submitForm} text="Sign up" />
    </form>
  );
};

export default SignupForm;
