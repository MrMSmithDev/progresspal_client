import React from 'react';

interface GenericButtonInterface {
  func: (args: any) => any;
  text: string;
}

const GenericButton: React.FC<GenericButtonInterface> = ({ func, text }) => {
  return <button onClick={func} className="rounded bg-background dark:bg-background-dark text-background-dark dark:text-background p-1 w-30 cursor-pointer tracking-wider">{text}</button>;
};

export default GenericButton;
