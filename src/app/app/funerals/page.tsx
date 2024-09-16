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
        <div className='hidden 2xl:block border rounded border-blue-800 p-2 bg-blue-100 h-[50vh]'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis sunt
          soluta esse repudiandae natus eum voluptatibus et aut voluptate quasi
          inventore porro, nemo nam error tempore magni nulla totam autem optio
          obcaecati eveniet ipsam itaque? Sed eos, odit, atque nobis ratione
          temporibus recusandae pariatur, officia beatae nam porro inventore
          quaerat!
        </div>
      </div>
    </div>
  );
};

export default Page;
