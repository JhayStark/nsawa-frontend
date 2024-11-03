'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuOptions = [
  {
    title: 'Dashboard',
    icon: '/svgs/SquaresFour.svg',
    link: '/',
  },
  {
    title: 'My Funerals',
    icon: '/svgs/tombstone.svg',
    link: 'funerals',
  },
  // {
  //   title: 'Mourners',
  //   icon: '/svgs/people.svg',
  //   link: 'personalities',
  // },
  // {
  //   title: 'Collections',
  //   icon: '/svgs/donate.svg',
  //   link: 'collections',
  // },
  {
    title: 'Profile',
    icon: '/svgs/profile.svg',
    link: 'profile',
  },
];

const BottomNavigation = () => {
  const pathName = usePathname();

  const isCurrentPath = (path: string) => {
    const pathSegments = pathName.split('/');
    const routeName = pathSegments[2] || '/';
    return routeName == path;
  };
  return (
    <nav className='h-[70px] bg-primary fixed lg:hidden w-full bottom-0'>
      <ul className='flex justify-between items-center h-full px-6 '>
        {menuOptions?.map(menu => (
          <Link key={menu.title} href={`/app/${menu.link}`}>
            <li
              className={`${
                isCurrentPath(menu.link) && 'text-blue-600'
              } text-[#6B7480]`}
            >
              <Image
                src={menu.icon}
                width={24}
                height={24}
                alt='Dashboard Icon'
              />
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigation;
