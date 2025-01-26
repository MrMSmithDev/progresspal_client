import { SubmitButton } from '@components/buttons';
import { useAuth } from '@hooks/useAuth';
import { useModal } from '@hooks/useModal';
import { fetchData } from '@utils/api';
import React, { useState } from 'react';

interface SignInResponse {
  message: string;
  id: string;
  token: string;
  username: string;
}

const SignInForm: React.FC = () => {
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const { setToken, setUsername } = useAuth();
  const { openModal } = useModal();

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUsernameInput(e.currentTarget.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPasswordInput(e.currentTarget.value);
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    };

    const data = (await fetchData(
      '/user/signin',
      reqOptions
    )) as SignInResponse;
    if (!data.token) {
      openModal('Error signing in: Please try again later');
    } else {
      setToken(data.token);
      setUsername(data.username);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      openModal(`Welcome back ${data.username}`);
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
      <SubmitButton func={submitForm} text="Sign in" />
    </form>
  );
};

export default SignInForm;
