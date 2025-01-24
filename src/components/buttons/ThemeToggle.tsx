import useTheme from '@hooks/useTheme';
import React from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return <button className={`${theme}`} onClick={toggleTheme}></button>;
};

export default ThemeToggle;
