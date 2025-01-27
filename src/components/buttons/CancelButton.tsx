import { useAuth } from '@hooks/useAuth';
import React from 'react';

interface CancelButtonProps {
  cancelFunc: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ cancelFunc }) => {
  return (
    <button
      onClick={cancelFunc}
      className="rounded bg-red-500 text-white p-1 w-30 cursor-pointer tracking-wider"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
