'use client';

import { CircleUserRound, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { logout, selectUser } from '@/lib/features/auth/authSlice';
import { useEffect, useState } from 'react';

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
  {
    title: 'Collections',
    icon: '/svgs/donate.svg',
    link: 'collections',
  },
  {
    title: 'Profile',
    icon: '/svgs/profile.svg',
    link: 'profile',
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [userName, setUserName] = useState('');

  const isCurrentPath = (path: string) => {
    const pathSegments = pathName.split('/');
    const routeName = pathSegments[2] || '/';
    return routeName == path;
  };

  useEffect(() => {
    if (user) {
      setUserName(user?.userName.split(' ')[0]);
    }
  }, [user]);

  return (
    <aside className='hidden xl:flex flex-col bg-primary font-poppins  py-9'>
      <header>
        <Image
          src='/image/logo.png'
          alt='Nsawa logo'
          width={198}
          height={48}
          className='mx-auto'
        />

        <div className='flex items-center gap-x-6 mx-auto max-w-52 my-8 '>
          <CircleUserRound className='text-white' size={50} />
          <p className='font-bold text-white '>{userName}</p>
        </div>
      </header>
      <nav aria-label='Main Navigation'>
        <ul>
          {menuOptions?.map(menu => (
            <Link key={menu.title} href={`/app/${menu.link}`}>
              <li
                className={`${
                  isCurrentPath(menu.link) && 'bg-white'
                } text-white`}
              >
                <div className='flex gap-x-6 items-center max-w-[180px] mx-auto py-5'>
                  <Image
                    src={menu.icon}
                    width={24}
                    height={24}
                    alt='Dashboard Icon'
                  />
                  <p
                    className={`${
                      isCurrentPath(menu.link) && 'text-primary'
                    } text-lg`}
                  >
                    {menu.title}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <div
        className='flex gap-x-3 w-full mt-auto  text-[#6B7480] items-center max-w-[167px] mx-auto py-5 cursor-pointer'
        onClick={() => {
          dispatch(logout());
          router.replace('/auth');
        }}
      >
        <LogOut />
        <p className='text-lg'>Log out</p>
      </div>
    </aside>
  );
};

export default Sidebar;
