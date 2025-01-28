import { CancelButton, SubmitButton } from '@components/buttons';
import { useModal } from '@hooks/useModal';
import { fetchData } from '@utils/api';
import React, { useState } from 'react';

interface UpdateEmailFormProps {
  closeForm: () => void;
}

const UpdateEmailForm: React.FC<UpdateEmailFormProps> = ({
  closeForm,
}) => {
  const [oldEmailInput, setOldEmailInput] = useState<string>('');
  const [newEmailInput, setNewEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const { openModal } = useModal();

  function handleOldEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOldEmailInput(e.currentTarget.value);
  }

  function handleNewEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewEmailInput(e.currentTarget.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordInput(e.currentTarget.value);
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const reqOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        oldEmail: oldEmailInput,
        newEmail: newEmailInput,
        password: passwordInput,
      }),
    };

    const data = await fetchData('/user/update-email', reqOptions);

    if (data.error) {
      openModal(data.error);
    } else {
      openModal(data.message);
      closeForm();
    }
  }

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col items-center rounded border border-background-dark dark:border-background pt-6 p-4 my-4 w-full"
    >
      <div className="pb-3 inline-block w-full">
        <label
          className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
          htmlFor="old-email"
        >
          Old email
        </label>
        <input
          className="shadow appearance-none border bg-input dark:bg-input-dark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="old-email"
          type="text"
          onChange={handleOldEmailChange}
          placeholder="Old Email"
        />
      </div>

      <div className="pb-3 inline-block w-full">
        <label
          className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
          htmlFor="new-email"
        >
          New email
        </label>
        <input
          className="shadow appearance-none border bg-input dark:bg-input-dark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="new-email"
          type="text"
          onChange={handleOldEmailChange}
          placeholder="New Email"
        />
      </div>

      <div className="pb-3 inline-block w-full">
        <label
          className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border bg-input dark:bg-input-dark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          onChange={handlePasswordChange}
          placeholder="Password"
        />
      </div>

      <div className="flex gap-2">
        <SubmitButton func={submitForm} text="Update" />
        <CancelButton cancelFunc={closeForm} />
      </div>
    </form>
  );
};

export default UpdateEmailForm;
