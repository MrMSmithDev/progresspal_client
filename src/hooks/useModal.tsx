import React, { createContext, ReactNode, useContext, useState } from 'react';
import style from '@styles/useModal.module.scss';

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalMessage: string | null;
  isModalOpen: boolean;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  function openModal(message: string) {
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }

    setModalMessage(message);
    setIsModalOpen(true);

    const timer = setTimeout(() => {
      closeModal();
    }, 3000);
    setAutoCloseTimer(timer);
  }

  function closeModal() {
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      setAutoCloseTimer(null);
    }

    setModalMessage(null);
    setIsModalOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, modalMessage, isModalOpen }}
    >
      {children}
      {isModalOpen && (
        <div className={style.modalOuter}>
          <div className={style.modalInner}>
            <p className={style.modalMessage}>{modalMessage}</p>
            <button onClick={closeModal}></button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('useModal must be used within a modal provider');

  return context;
};
