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
    <header className="fixed top-0 w-full py-1 px-5 grid grid-cols-[auto_1fr] md:grid-cols-2 items-center bg-gradient-to-b from-black via-black to-transparent">
      <div className="flex flex-start items-center gap-2 mr-auto">
        <Image
          src={mainLogoNoBg}
          height={logoSize}
          width={logoSize}
          alt="Progress Pal Logo"
          className="rounded-lg bg-background-dark"
        />
        <h1 className="text-4xl tracking-wider font-delirium text-transparent bg-gradient-to-t from-primary to-green-gradient bg-clip-text hidden md:inline-block select-none">
          Progress Pal
        </h1>
      </div>
      <nav className="flex gap-5 lg:gap-10 items-center ml-auto">
        <Link href="/dashboard">
          <span
            className={`${isActive('/dashboard') ? 'active-nav-text' : 'hover:border-b-primary hover:border-b-2 hover:border-b-solid'} text-gray-100 hidden md:!block tracking-widest font-bold`}
          >
            Home
          </span>
          <HomeIcon
            className={`${isActive('/dashboard') ? 'active-nav-icon' : ''} md:!hidden`}
          />
        </Link>
        <Link href="/activities">
          <span
            className={`${isActive('/activities') ? 'active-nav-text' : 'hover:border-b-primary hover:border-b-2 hover:border-b-solid'} text-gray-100 hidden md:!block tracking-widest font-bold`}
          >
            Activities
          </span>
          <DumbbellIcon
            className={`${isActive('/activities') ? 'active-nav-icon' : ''} md:!hidden`}
          />
        </Link>
        <Link href="/progress">
          <span
            className={`${isActive('/progress') ? 'active-nav-text' : 'hover:border-b-primary hover:border-b-2 hover:border-b-solid'} text-gray-100 hidden md:!block tracking-widest font-bold`}
          >
            Progress
          </span>
          <GraphIcon
            className={`${isActive('/progress') ? 'active-nav-icon' : ''} md:!hidden`}
          />
        </Link>
        <Link href="/settings">
          <span
            className={`${isActive('/settings') ? 'active-nav-text' : 'hover:border-b-primary hover:border-b-2 hover:border-b-solid'} text-gray-100 hidden md:!block tracking-widest font-bold`}
          >
            Settings
          </span>
          <SettingsIcon
            className={`${isActive('/settings') ? 'active-nav-icon' : ''} md:!hidden`}
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
