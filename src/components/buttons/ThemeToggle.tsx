import useTheme from '@hooks/useTheme';
import React from 'react';

import style from '@styles/themeToggle.module.scss';
import { DarkModeIcon, LightModeIcon } from '@components/icons';

const ThemeToggle: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button className="h-[50px] w-[50px] p-0 rounded-lg flex justify-center items-center">
      <LightModeIcon />
      <DarkModeIcon />
    </button>
  );
};

export default ThemeToggle;
