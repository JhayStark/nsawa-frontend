'use client';

import FuneralCard from '@/components/FuneralCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetFuneralsQuery } from '@/lib/features/funeralApiSlice';
import { Search } from 'lucide-react';
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
    <div className='font-sentient space-y-5 flex flex-col overflow-y-hidden  h-full'>
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
        </div>
      </div>
    </div>
  );
};

export default Page;
