import { CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL } from 'next/dist/shared/lib/constants';
import React, { useEffect, useRef } from 'react';

interface ModalFormBgProps {
  children: React.ReactNode;
  closeModal: () => void;
}

const ModalFormBg: React.FC<ModalFormBgProps> = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    // close on click outside
  }, [ref]);

  return (
    <div
      ref={ref}
      className="flex justify-center items-center p-5 min-h-[100lvh] w-[100vw] modal-form-bg absolute top-0 left-0"
    >
      <div className="flex-grow m-5 w-full min-h-200 max-w-200 bg-background dark:bg-background-dark rounded p-3">
        {children}
      </div>
    </div>
  );
};

export default ModalFormBg;
