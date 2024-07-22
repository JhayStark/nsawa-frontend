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
          <Image
            src='/image/logo.png'
            alt='Nsawa logo'
            width={198}
            height={48}
          />
          <div className='text-white space-y-9'>
            <h2 className='text-6xl max-w-[18ch]'>
              Lorem ipsum dolor sit amet consectetur
            </h2>
            <p className='text-lg'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
              eligendi non placeat doloremque voluptatibus, impedit error rem
              nemo quas eos. Fugit officiis dolorum ea ducimus! Eum qui aperiam
              est nobis.
            </p>
          </div>
        </div>
        <div className='h-full w-full bg-[#D4D4D4] bg-opacity-10  backdrop-blur-xl flex items-center px-16'>
          <div className='absolute lg:hidden top-10 right-0 left-0 flex items-center justify-center w-full'>
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
