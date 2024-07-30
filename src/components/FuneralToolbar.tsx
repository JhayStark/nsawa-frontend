'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { CirclePlus } from 'lucide-react';
import { useGetFuneralsQuery } from '@/lib/features/funeralApiSlice';
import { Combobox } from './ui/ComboBox';
import { useMemo } from 'react';

const FuneralToolbar = () => {
  const { data, isLoading } = useGetFuneralsQuery({});
  const funerals = useMemo(() => {
    if (data?.funerals?.length) {
      const funerals = data.funerals.map((funeral: any) => ({
        label: funeral.nameOfDeceased,
        value: funeral._id,
      }));
      return funerals;
    } else {
      return [];
    }
  }, [data]);

  return (
    <div className='flex justify-between items-center mb-4'>
      <Combobox
        data={funerals}
        label='Select Funeral'
        filter='selected-funeral'
        searchParams
      />
      <Link href='/app/funerals/create'>
        <Button className='flex items-center gap-x-3 rounded-3xl p-5 '>
          <CirclePlus />
          <span> Create New Funeral</span>
        </Button>
      </Link>
    </div>
  );
};

export default FuneralToolbar;
