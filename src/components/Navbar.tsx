import Link from 'next/link';
import React from 'react';

const menuItems = [
  {
    title: 'About',
    link: '#about',
  },
  {
    title: 'How it works',
    link: '#howItWorks',
  },
  {
    title: 'Faqs',
    link: '#faqs',
  },
  {
    title: 'Contact Us',
    link: '#contactUs',
  },
];

const Navbar = () => {
  return (
    <div className='max-w-[1600px] mx-auto font-sentient flex items-center justify-between py-4 px-5'>
      <h1 className='text-2xl font-bold'>Nsawa</h1>
      <div className='space-x-5 hidden md:block'>
        {menuItems.map(link => (
          <a
            href={link.link}
            key={link.link}
            className='cursor-pointer hover:underline'
          >
            {link.title}
          </a>
        ))}
      </div>
      <Link href='/' className='bg-primary rounded-3xl text-white px-5 py-2'>
        Create Funeral
      </Link>
    </div>
  );
};

export default Navbar;
