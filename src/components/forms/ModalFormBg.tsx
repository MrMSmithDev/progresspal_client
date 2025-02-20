import React, { useEffect, useRef } from 'react';

interface ModalFormBgProps {
  children: React.ReactNode;
  closeModal: () => void;
}

const ModalFormBg: React.FC<ModalFormBgProps> = ({ children, closeModal }) => {
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        function closeModalCallback(event: MouseEvent) {
          const modal = ref.current;
          const workoutButton = document.querySelector('.open-button');

          if (
            modal &&
            !modal.contains(event.target as Node) &&
            workoutButton &&
            !workoutButton.contains(event.target as Node)
          ) {
            closeModal();
            window.removeEventListener('click', closeModalCallback);
          }
        }
        window.addEventListener('click', closeModalCallback);

        return () => window.removeEventListener('click', closeModalCallback);
      }
    }, 0);
  }, []);

  return (
    <div
      className="fixed flex justify-center items-center p-5 min-h-[100lvh] w-[100vw] modal-form-bg absolute top-0 left-0"
    >
      <div ref={ref} className="flex-grow m-5 w-full max-w-200 max-h-[80lvh] overflow-y-auto bg-background dark:bg-background-dark rounded p-3">
        {children}
      </div>
    </div>
  );
};

export default ModalFormBg;
