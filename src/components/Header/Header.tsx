import { mainLogoNoBg } from '@assets/images';
import {
  DumbbellIcon,
  GitHubIcon,
  HomeIcon,
  LinkedInIcon,
  SettingsIcon,
  GraphIcon,
} from '@components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [logoSize, setLogoSize] = useState<number>(50);
  const router = useRouter();

  useEffect(() => {
    function updateLogoSize() {
      setLogoSize(window.innerWidth > 768 ? 50 : 30);
    }

    updateLogoSize();

    window.addEventListener('resize', updateLogoSize);

    return () => window.removeEventListener('resize', updateLogoSize);
  }, []);

  function isActive(path: string) {
    return router.pathname.toLowerCase() === path.toLowerCase();
  }

  return (
    <header className="fixed top-0 w-full py-1 px-5 grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center bg-gradient-to-b from-black via-black to-transparent">
      <div className="flex flex-start items-center gap-2 mr-auto">
        <Image
          src={mainLogoNoBg}
          height={logoSize}
          width={logoSize}
          alt="Progress Pal Logo"
          className="rounded-lg bg-background-dark"
        />
        <h1 className="text-4xl tracking-wider font-delirium text-transparent bg-gradient-to-t from-primary to-green-gradient bg-clip-text hidden md:inline-block">
          Progress Pal
        </h1>
      </div>
      <nav className="flex gap-5 lg:gap-10 items-center ml-auto mr-auto">
        <Link href="/dashboard">
          <HomeIcon
            className={`${isActive('/dashboard') ? 'active-nav-icon' : ''}`}
          />
        </Link>
        <Link href="/activities">
          <DumbbellIcon
            className={`${isActive('/activities') ? 'active-nav-icon' : ''}`}
          />
        </Link>
        <Link href="/progress">
          <GraphIcon
            className={`${isActive('/progress') ? 'active-nav-icon' : ''}`}
          />
        </Link>
        <Link href="/settings">
          <SettingsIcon
            className={`${isActive('/settings') ? 'active-nav-icon' : ''}`}
          />
        </Link>
      </nav>
      <div className="flex gap-3 items-center ml-auto">
        <a href="https://www.linkedin.com/in/michael-smith-bbbaab345/">
          <LinkedInIcon />
        </a>
        <a href="https://github.com/MrMSmithDev/progresspal_client">
          <GitHubIcon />
        </a>
      </div>
    </header>
  );
};

export default Header;
