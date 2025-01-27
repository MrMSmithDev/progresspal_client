import { useAuth } from '@hooks/useAuth';
import React from 'react';

const SignOutButton: React.FC = () => {
  const { signout } = useAuth();

  return (
    <button
      onClick={signout}
      className="rounded bg-red-500 text-white p-1 w-30 cursor-pointer tracking-wider"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
