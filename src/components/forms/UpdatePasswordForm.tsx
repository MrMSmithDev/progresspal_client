import { CancelButton, SubmitButton } from '@components/buttons';
import { useModal } from '@hooks/useModal';
import { fetchData } from '@utils/api';
import React, { useState } from 'react';

interface UpdatePasswordFormProps {
  closeForm: () => void;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
  closeForm,
}) => {
  const [oldPasswordInput, setOldPasswordInput] = useState<string>('');
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [repeatPasswordInput, setRepeatPasswordInput] = useState<string>('');

  const { openModal } = useModal();

  function handleOldPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOldPasswordInput(e.currentTarget.value);
  }

  function handleNewPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPasswordInput(e.currentTarget.value);
  }

  function handleRepeatPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRepeatPasswordInput(e.currentTarget.value);
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const reqOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        oldPassword: oldPasswordInput,
        newPassword: newPasswordInput,
        repeatNewPassword: repeatPasswordInput,
      }),
    };

    const data = await fetchData('/user/update-password', reqOptions);

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
          className="block text-gray-700 text-sm font-bold"
          htmlFor="old-password"
        >
          Old Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="old-password"
          type="password"
          onChange={handleOldPasswordChange}
          placeholder="Old Password"
        />
      </div>

      <div className="pb-3 inline-block w-full">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="new-password"
        >
          New Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="new-password"
          type="password"
          onChange={handleNewPasswordChange}
          placeholder="New Password"
        />
      </div>

      <div className="pb-3 inline-block w-full">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="repeat-password"
        >
          Repeat New Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="repeat-password"
          type="password"
          onChange={handleOldPasswordChange}
          placeholder="Repeat New Password"
        />
      </div>
      <div className="flex gap-2">
        <SubmitButton func={submitForm} text="Update" />
        <CancelButton cancelFunc={closeForm} />
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
