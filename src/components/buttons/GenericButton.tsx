import React from 'react';

interface GenericButtonInterface {
  inset?: boolean;
  func: (args: any) => any;
  text: string;
}

const GenericButton: React.FC<GenericButtonInterface> = ({
  inset = false,
  func,
  text,
}) => {
  return (
    <button
      onClick={func}
      className={`${inset ? 'inset-button' : ''} rounded bg-background-dark dark:bg-background text-background dark:text-background-dark p-1 min-w-30 cursor-pointer tracking-wider`}
    >
      {text}
    </button>
  );
};

export default GenericButton;
