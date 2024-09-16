'use client';

import FuneralCard from '@/components/FuneralCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetFuneralsQuery } from '@/lib/features/funeralApiSlice';
import { ScrollText, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const Page = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchValue] = useDebounce(searchInput, 500);
  const { data, isFetching, isLoading } = useGetFuneralsQuery({
    search: searchValue,
  });

  return (
    <div className='font-sentient space-y-3 lg:space-y-5 flex flex-col overflow-y-hidden  h-full'>
      <div
        style={{
          backgroundImage: 'url("/image/auth-bg.png")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className='h-40  rounded-lg shadow-lg'
      >
        <div className='bg-black bg-opacity-55 h-full rounded-lg flex flex-col justify-between p-5'>
          <p className='text-white max-w-fit text-lg'>Welcome to Nsawa!</p>

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
      <div className='flex-1  gap-y-2 overflow-hidden flex flex-col '>
        <div className='flex items-center gap-x-1 border rounded-md p-2'>
          <Search className='text-gray-400' />
          <Input
            className='border-none'
            placeholder='Search funerals'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>
        <div className='overflow-y-auto flex-1 space-y-5 py-5 md:px-5'>
          {data?.funerals?.map((funeral: any) => (
            <FuneralCard funeral={funeral} key={funeral?._id} />
          ))}
          {!data?.funerals?.length && (
            <div className=' col-span-4  2xl:col-span-3 h-[70vh] flex justify-center items-center '>
              <div className='flex flex-col justify-center items-center text-gray-600'>
                <ScrollText size={300} className='text-gray-200' />
                <p>No funerals to display</p>
                <p>Created funerals will be displayed here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
