import React from 'react';
import { DownIcon } from '@components/icons';

const DemoButton: React.FC = () => {
  return (
    <a
      className="font-delirium text-background-dark dark:text-white text-2xl tracking-wider flex items-center absolute bottom-10 right-10 rounded-2xl bg-secondary-background dark:bg-background-dark border-2 border-background-dark dark:border-background px-3 before:content-[''] before:w-full before:absolute before:border-background before:border-2 before:h-full before:w-full before:left-0 before:rounded-2xl before:animate-ping before:z-0"
      href="#demo"
      id="demo-link"
    >
      DEMO <DownIcon/>
    </a>
  );
};

export default DemoButton;
