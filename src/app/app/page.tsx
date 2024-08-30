'use client';

import { Button } from '@/components/ui/button';
import { useGetFuneralsQuery } from '@/lib/features/funeralApiSlice';
import { formatDateToString } from '@/lib/helpers';
import { CalendarIcon, ChevronRight, MapPinIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react';

const Page = () => {
  const { data } = useGetFuneralsQuery({});
  const funeralData = useMemo(() => {
    return data?.funerals[0];
  }, [data]);
  return (
    <div className='font-sentient space-y-5'>
      <div
        style={{
          backgroundImage: 'url("/image/auth-bg.png")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className='h-52  rounded-lg shadow-lg'
      >
        <div className='bg-black bg-opacity-55 h-full rounded-lg flex flex-col justify-between p-5'>
          <p className='text-white max-w-fit'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            eligendi saepe iste asperiores accusantium quia, culpa pariatur
            Cupiditate eligendi saepe iste asperiores accusantium quia, culpa
            pariatur Cupiditate eligendi saepe iste asperiores accusantium quia,
            culpa pariatur
          </p>
          <Link href='/app/funerals/create'>
            <Button
              className='flex items-center gap-x-3 w-full p-5 xl:max-w-72 '
              variant='secondary'
            >
              <span> Set Up Funeral</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 h-[500px] gap-5'>
        {funeralData && (
          <div
            className='rounded-lg'
            style={{
              backgroundImage: `url(${data?.bannerImage})`,
              backgroundSize: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='bg-black opacity-55 h-full w-full rounded-lg'>
              <div className='text-white h-full p-5 flex flex-col justify-between '>
                <div>
                  <div>
                    <h2 className='xl:text-lg'>Funeral of the late</h2>
                    <h3 className='text-2xl xl:text-4xl'>
                      {funeralData?.nameOfDeceased}
                    </h3>
                  </div>
                  <p className='xl:text-lg'>
                    {funeralData?.yearOfBirth} - {funeralData?.yearOfDeath}
                  </p>
                </div>
                <div className='flex sm:flex-row flex-col gap-10 items-end justify-between '>
                  <div className='text-white text-lg'>
                    <div className='flex items-center gap-2'>
                      <MapPinIcon className='h-5 w-5 ' />
                      <div className=''>{funeralData?.funeralLocation}</div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <CalendarIcon className='h-5 w-5 ' />
                      <div className=''>
                        From {formatDateToString(funeralData?.startDate)} to{' '}
                        {formatDateToString(funeralData?.endDate)}
                      </div>
                    </div>
                  </div>
                  <Button className=' bg-white text-primary font-medium self-end '>
                    <Link href={`app/funerals/${funeralData?._id}`}>
                      <ChevronRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
