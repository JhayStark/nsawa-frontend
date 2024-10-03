'use client';

import { Button } from '@/components/ui/button';
import {
  CalendarIcon,
  ChevronRight,
  CirclePlus,
  Eye,
  MapPinIcon,
  ScrollText,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateToString, checkActiveFuneral } from '@/lib/helpers';
import { useGetFuneralsQuery } from '@/lib/features/funeralApiSlice';
import { useRouter } from 'next/navigation';
import FuneralCard from '@/components/FuneralCard';

const Page = () => {
  const router = useRouter();
  const { data } = useGetFuneralsQuery({
    search: '',
    pageSize: 10,
    pageNumber: 1,
  });

  return (
    <div className='font-sentient h-full space-y-3 '>
      <Link href='/app/funerals/create'>
        <Button className='flex items-center gap-x-3 w-full  p-5 xl:max-w-72 ml-auto '>
          <CirclePlus />
          <span> Set Up Funeral</span>
        </Button>
      </Link>
      <div className='grid grid-cols-4 gap-4'>
        <div className='hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-5  pb-5 col-span-4 2xl:col-span-3'>
          {data?.funerals?.map((funeral: any, index: number) => (
            <Card
              key={funeral._id}
              className={`border-l-8 cursor-pointer hover:scale-[101%] max-h-56 ${
                index == 0 ? 'border-primary' : 'border-secondary'
              } ${index == 0 && 'lg:col-span-2'}`}
              onClick={() => router.push(`/app/funerals/${funeral._id}`)}
            >
              <CardHeader>
                <CardTitle>
                  Funeral of the Late {funeral.nameOfDeceased}
                </CardTitle>
              </CardHeader>
              <CardContent className='grid gap-2'>
                <div className='flex items-center gap-2'>
                  <CalendarIcon className='h-5 w-5 text-muted-foreground' />
                  <div className='text-muted-foreground'>
                    From{' '}
                    <span className='font-medium'>
                      {formatDateToString(funeral.startDate)}
                    </span>{' '}
                    to{' '}
                    <span className='font-medium'>
                      {formatDateToString(funeral.endDate)}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <MapPinIcon className='h-5 w-5 text-muted-foreground' />
                  <div className='text-muted-foreground'>
                    {funeral.funeralLocation}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='lg:hidden col-span-4 space-y-5 pb-2'>
          {data?.funerals?.map((funeral: any) => (
            <FuneralCard funeral={funeral} key={funeral._id} />
          ))}
        </div>
        {!data?.funerals?.length && (
          <div className=' col-span-4  2xl:col-span-3 h-[70vh] flex justify-center items-center '>
            <div className='flex flex-col justify-center items-center'>
              <ScrollText size={300} className='text-gray-200' />
              <p>No funerals to display</p>
              <p> created funerals will be displayed here</p>
            </div>
          </div>
        )}
        <div className='hidden 2xl:block border rounded border-blue-800 p-2 bg-blue-100 h-[50vh] py-5'>
          <ul className='space-y-5 list-disc px-5 text-sm'>
            <li>
              If you need to create a new funeral page, click the "Set Up
              Funeral" button.
            </li>
            <li>
              You can view all your funerals here. Click on a funeral to manage
              each one by viewing donation stats, updating details, or
              withdrawing funds.
            </li>
            <li>
              Note: Only funerals you’ve personally created will appear here. If
              you’re unable to find a funeral, ensure you're logged into the
              correct account.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
