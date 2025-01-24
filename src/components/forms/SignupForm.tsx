import { SubmitButton } from '@components/buttons';
import { useAuth } from '@hooks/useAuth';
import { useModal } from '@hooks/useModal';
import { fetchData } from '@utils/api';
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

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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

    const data = await fetchData('/user/signup', reqOptions) as SignupResponse;
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
      className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
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

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          onChange={handleEmailChange}
          placeholder="email@example.com"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
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

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
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

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
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
        />
        <p>How many times would you like to work out a month?</p>
      </div>
      <SubmitButton func={submitForm} text="Sign up" />
    </form>
  );
};

export default SignupForm;
