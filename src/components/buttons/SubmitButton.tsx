import React from 'react';

interface SubmitButtonInterface {
  func: (args: any) => any;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonInterface> = ({ func, text }) => {
  return <button onClick={func} className="rounded">{text}</button>;
};

export default SubmitButton;
