'use client';

import { useGetPublicFuneralQuery } from '@/lib/features/funeralApiSlice';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import QRCode from 'react-qr-code';

const Page = () => {
  const params = useParams();
  const { data } = useGetPublicFuneralQuery(params.id as string);
  return (
    <div className='flex justify-center items-center flex-col h-screen '>
      <div className='grid grid-cols-2 items-center gap-2'>
        {/* <div className='hidden lg:block relative w-[500px]'> */}
        <Image
          src={data?.bannerImage}
          width={500}
          height={800}
          alt='deceaseds image'
          className='rounded-[8px] object-cover'
        />
        {/* </div> */}
        <div className='col-span-2 px-1 lg:col-span-1 flex justify-center items-center flex-col'>
          <h2 className='text-center lg:text-left text-lg lg:text-2xl font-bold font-sans px-4 pt-5 pb-4'>
            Scan to donate
            {/* the {data?.familyName} family */}
          </h2>
          <div className='px-4 pt-2 pb-10 space-x-4 flex lg:hidden items-center'>
            <Image
              src={data?.bannerImage}
              width={56}
              height={56}
              alt='deceaseds image'
              className='rounded-[8px]'
            />
            <div className=''>
              <h3 className='font-medium'>
                In loving memory of {data?.nameOfDeceased}
              </h3>
              <p className='text-[#4F7396] text-sm'>
                Your donation will help the {data?.familyName}s.
              </p>
            </div>
          </div>
          <div
            style={{
              height: 'auto',
              margin: 'auto',
              maxWidth: 400,
              width: '100%',
            }}
          >
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={process.env.NEXT_PUBLIC_FRONTEND_URL + '/' + data?._id}
              viewBox={`0 0 256 256`}
            />
          </div>
          <p className='italic text-sm text-primary mt-5'>
            Powered by Nsawa Digital
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
