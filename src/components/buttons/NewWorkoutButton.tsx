import { ModalFormBg, NewWorkoutForm } from '@components/forms';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const NewWorkoutButton: React.FC = () => {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  function OpenWorkoutForm() {
    setFormIsOpen(true);
  }

  function closeWorkoutForm() {
    setFormIsOpen(false);
  }

  return (
    <>
      {formIsOpen
        ? createPortal(
            <ModalFormBg closeModal={closeWorkoutForm}>
              <NewWorkoutForm closeForm={closeWorkoutForm} />
            </ModalFormBg>,
            document.querySelector('#modal_root')
          )
        : null}
      <button
        onClick={OpenWorkoutForm}
        className="workout-button flex flex-grow items-center justify-center bg-background-dark dark:bg-background text-center text-lg rounded text-gray-100 dark:text-gray-700 py-1 px-3 cursor-pointer"
      >
        <span className="bg-red-500 rounded-full h-5 w-5 inline-block m-2 animate-pulse"></span>{' '}
        <span className="font-bold">Record new workout</span>
      </button>
    </>
  );
};

export default NewWorkoutButton;
