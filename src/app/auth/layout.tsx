import Image from 'next/image';
import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      style={{
        backgroundImage: 'url("/image/auth-bg.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className='h-[100vh] w-[100vw] font-sentient '
    >
      <div className='h-full w-full grid grid-cols-1 lg:grid-cols-2 bg-black bg-opacity-55'>
        <div className='px-16 py-8 hidden  lg:flex flex-col justify-between'>
          <div>
            <Image
              src='/image/logo.png'
              alt='Nsawa logo'
              width={198}
              height={48}
            />
            <h1 className='text-2xl font-bold text-white text-right w-[198px]'>
              Digital
            </h1>
          </div>
          <div className='text-white space-y-9'>
            <h2 className='text-5xl max-w-[20ch]'>Welcome to Nsawa Digital</h2>
            <p className='text-lg'>
              Organizing a funeral can be overwhelming, but collecting donations
              doesn’t have to be. With Nsawa Digital, you can easily create an
              account, set up a dedicated funeral donation page, and start
              receiving contributions to honor your loved one.
            </p>
          </div>
        </div>
        <div className='h-full w-full bg-[#D4D4D4] bg-opacity-10  backdrop-blur-xl flex items-center px-6 lg:px-16'>
          <div className='absolute lg:hidden top-5 right-0 left-0 flex items-center justify-center w-full'>
            <Image
              src='/image/logo.png'
              alt='Nsawa logo'
              width={198}
              height={48}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
