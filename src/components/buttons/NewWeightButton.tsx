import { ModalFormBg, NewWeightForm } from '@components/forms';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const NewWeightButton: React.FC = () => {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  function OpenWeightForm() {
    setFormIsOpen(true);
  }

  function closeWeightForm() {
    setFormIsOpen(false);
  }

  return (
    <>
      {formIsOpen
        ? createPortal(
            <ModalFormBg closeModal={closeWeightForm}>
              <NewWeightForm closeForm={closeWeightForm} />
            </ModalFormBg>,
            document.querySelector('#modal_root')
          )
        : null}
      <button
        onClick={OpenWeightForm}
        className="flex flex-grow items-center justify-center bg-background-dark dark:bg-background text-center text-lg rounded text-gray-100 dark:text-gray-700 py-1 px-3 cursor-pointer"
      >
        <span className="bg-red-500 rounded-full h-5 w-5 inline-block m-2 animate-pulse"></span>{' '}
        <span className="font-bold">Record new weight</span>
      </button>
    </>
  );
};

export default NewWeightButton;
