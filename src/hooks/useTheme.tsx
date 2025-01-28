import { useEffect, useState } from 'react';

type Themes = 'light' | 'dark';

const useTheme = (): [string, () => void] => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const initialTheme = (storedTheme || systemTheme) as Themes;

    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
  }, []);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return [theme, toggleTheme];
};

export default useTheme;
