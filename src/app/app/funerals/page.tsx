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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDateToString, checkActiveFuneral } from '@/lib/helpers';
import { useGetFuneralsQuery } from '@/lib/features/funeralApiSlice';
import { useRouter } from 'next/navigation';

const funerals = [
  {
    id: 1,
    name: 'Kwame Nkrumah',
    startDate: '2023-06-01',
    endDate: '2024-08-20',
    location: 'Independence Square, Accra',
  },
  {
    id: 2,
    name: 'Yaa Asantewaa',
    startDate: '2023-07-15',
    endDate: '2023-07-17',
    location: 'Kumasi Cultural Centre, Kumasi',
  },
  {
    id: 3,
    name: 'Kofi Annan',
    startDate: '2023-08-10',
    endDate: '2023-08-12',
    location: 'Labadi Beach Hotel, Accra',
  },
  {
    id: 4,
    name: 'Ama Ata Aidoo',
    startDate: '2023-09-05',
    endDate: '2023-09-07',
    location: 'Cape Coast Castle, Cape Coast',
  },
  {
    id: 5,
    name: 'Jerry Rawlings',
    startDate: '2023-10-20',
    endDate: '2023-10-22',
    location: 'Kwame Nkrumah Mausoleum, Accra',
  },
];

const Page = () => {
  const router = useRouter();
  const { data } = useGetFuneralsQuery({});

  return (
    <div className='font-sentient h-full space-y-3 '>
      <Link href='/app/funerals/create'>
        <Button className='flex items-center gap-x-3 w-full  p-5 xl:max-w-72 ml-auto '>
          <CirclePlus />
          <span> Set Up Funeral</span>
        </Button>
      </Link>
      <div className='grid grid-cols-4 gap-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5  pb-5 col-span-4 2xl:col-span-3'>
          {data?.funerals?.map((funeral, index) => (
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
