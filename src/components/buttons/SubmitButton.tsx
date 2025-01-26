import React from 'react';

interface SubmitButtonInterface {
  func: (args: any) => any;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonInterface> = ({ func, text }) => {
  return <button onClick={func} className="rounded bg-button dark:bg-button-dark text-white p-1 w-30 cursor-pointer tracking-wider">{text}</button>;
};

export default SubmitButton;
