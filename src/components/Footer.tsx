import React from 'react';

const Footer = () => {
  return (
    <div className='mt-16 font-sentient'>
      <div className='max-w-[1600px] mx-auto px-5 mb-16 md:mb-28'>
        <h2 className='text-primary text-4xl mb-5 font-medium'>
          Nsawa Digital
        </h2>
        <div className='flex flex-col md:flex-row items-start justify-between'>
          <p className='text-lg'> Donating to support friends and family</p>
          <div className='flex md:flex-row flex-col py-6 md:py-0 items-start gap-8 text-left text-lg'>
            <ul className='flex  md:space-y-3 md:flex-col gap-x-2'>
              <li className='cursor-pointer '>Create Funeral</li>
              <li className='cursor-pointer '>Help</li>
            </ul>
            <ul className='flex  md:space-y-3  md:flex-col gap-x-2'>
              <li className='cursor-pointer'>Instagram</li>
              <li className='cursor-pointer'>Twitter</li>
              <li className='cursor-pointer'>Facebook</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='bg-primary px-5'>
        <p className=' mx-auto max-w-7xl text-white py-3 text-sm text-center lg:text-left '>
          All Rights Reserved Nsawa | Designed by jodesign Developed by
          jhaystark
        </p>
      </div>
    </div>
  );
};

export default Footer;
