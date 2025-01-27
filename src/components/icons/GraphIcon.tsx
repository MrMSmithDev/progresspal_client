import React from 'react';
import { IconProps } from './types';

const GraphIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`${className} h-7 w-7 lg:h-10 md:w-10`}
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          d="M4 5V19C4 19.5523 4.44772 20 5 20H19"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M18 9L13 13.9999L10.5 11.4998L7 14.9998"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export default GraphIcon;
