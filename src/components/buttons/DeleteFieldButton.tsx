import DeleteFieldIcon from '@components/icons/DeleteFieldIcon';
import React from 'react';

interface DeleteFieldButtonProps {
  className?: string;
  removeFieldFunc: () => void;
}

const DeleteFieldButton: React.FC<DeleteFieldButtonProps> = ({
  className,
  removeFieldFunc,
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        removeFieldFunc();
      }}
      className={`relative bg-low mt-6 h-[34px] w-12 pl-4 rounded bg-low cursor-pointer overflow-hidden before:content-[''] before:absolute before:w-full before:h-2/4 before:bg-background dark:before:bg-background-dark before:-left-7 before:top-0 before:-rotate-45 before:z-10 after:content-[''] after:absolute after:w-full after:h-2/4 after:bg-background dark:after:bg-background-dark after:-left-7 after:top-2/4 after:rotate-45 ${
        className
      }`}
    >
      <DeleteFieldIcon className="h-[20px] w-[20px] scale-150" />
    </button>
  );
};

export default DeleteFieldButton;
