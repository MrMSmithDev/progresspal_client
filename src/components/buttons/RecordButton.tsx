import { ModalFormBg, NewWorkoutForm } from '@components/forms';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface RecordButtonProps {
  openForm: () => void;
  type: string;
}

const RecordButton: React.FC<RecordButtonProps> = ({ openForm, type }) => {
  return (
    <button
      onClick={openForm}
      className="open-button flex flex-grow items-center justify-center bg-background-dark dark:bg-background text-center text-lg rounded text-gray-100 dark:text-gray-700 py-1 px-3 cursor-pointer"
    >
      <span className="bg-red-500 rounded-full h-5 w-5 inline-block m-2 animate-pulse"></span>{' '}
      <span className="font-bold">Record new {type}</span>
    </button>
  );
};

export default RecordButton;
