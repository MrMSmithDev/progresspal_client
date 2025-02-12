import { useEffect, useState } from 'react';

type Themes = 'light' | 'dark';

const useTheme = (): [string, () => void] => {
  const [theme, setTheme] = useState<Themes>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) as Themes;
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, [theme]);

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
