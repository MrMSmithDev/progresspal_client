import useTheme from '@hooks/useTheme';
import React, { useEffect } from 'react';

import style from '@styles/themeToggle.module.scss';
import { DarkModeIcon, LightModeIcon } from '@components/icons';

const ThemeToggle: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button
      className="h-[34px] w-[34px] p-0 rounded-lg flex justify-center items-center cursor-pointer"
      onClick={toggleTheme}
    >
      <div className={theme === 'light' ? 'hidden' : ''}>
        <LightModeIcon />
      </div>

      <div className={theme === 'light' ? '' : 'hidden'}>
        <DarkModeIcon />
      </div>
    </button>
  );
};

export default ThemeToggle;
