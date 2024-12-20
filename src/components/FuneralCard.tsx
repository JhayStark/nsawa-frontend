'use client';

import React from 'react';
import { Button } from './ui/button';
import { checkActiveFuneral, formatDateToString } from '@/lib/helpers';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FuneralCard = ({ funeral }: any) => {
  const router = useRouter();
  return (
    <div
      className='flex items-center justify-between'
      role='button'
      onClick={() => router.push(`/app/funerals/${funeral._id}`)}
    >
      <div className='flex items-center gap-x-3'>
        <div className='g:w-[124px] w-24 h-20 lg:h-[100px] rounded-lg relative '>
          <Image
            fill
            alt='image of deceased'
            src={funeral.bannerImage}
            className='rounded-lg object-cover'
          />
        </div>
        <div>
          <p className='font-medium text-primary'>{funeral?.nameOfDeceased}</p>
          <p className='text-sm text-[#4F4F96]'>
            <span>Location:</span> <span>{funeral?.funeralLocation}</span>
          </p>
          <p className='text-sm text-[#4F4F96]'>
            {formatDateToString(funeral?.startDate)}
          </p>
          <div className='text-sm font-medium'>
            {checkActiveFuneral(funeral?.endDate) ? (
              <p className='text-green-600'>Active</p>
            ) : (
              <p className='text-red-600'>Ended</p>
            )}
          </div>
        </div>
      </div>
      <Button
        className='rounded-xl hidden md:flex'
        variant='secondary'
        onClick={() => router.push(`/app/funerals/${funeral._id}`)}
      >
        <Eye className='mr-2' /> <span>View</span>
      </Button>
    </div>
  );
};

export default FuneralCard;
