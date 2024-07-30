'use client';

import CashCollection from '@/components/CashCollection';
import DonationHistory from '@/components/DonationHistory';
import FuneralToolbar from '@/components/FuneralToolbar';
import StatsCard from '@/components/StatsCard';
import { Clipboard, HandCoins, UserPlus } from 'lucide-react';
import { useGetFuneralQuery } from '@/lib/features/funeralApiSlice';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {
  useGetDonationsQuery,
  useGetDonationStatsQuery,
} from '@/lib/features/donationsApiSlice';
import AddMourner from '@/components/AddMourner';

const Page = () => {
  const searchParams = useSearchParams();
  const selectedFuneral = useMemo(
    () => searchParams.get('selected-funeral') || '',
    [searchParams]
  );
  const { data } = useGetFuneralQuery(selectedFuneral);
  const { data: donations } = useGetDonationsQuery(selectedFuneral);
  const { data: donationStats } = useGetDonationStatsQuery(selectedFuneral);

  return (
    <div className=' space-y-8 font-sentient'>
      {/* <FuneralToolbar /> */}
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 2xl:gap-5 col-span-3'>
        <StatsCard
          className=' bg-secondary'
          title='Total donors'
          text={`${donationStats?.numberOfDonations || 0} donors`}
        />
        <StatsCard
          text={`GHS ${donationStats?.totalDonations || 0}`}
          className='bg-primary text-white'
          title='Total donations'
        />

        <StatsCard
          className='border-2 border-primary col-span-2 lg:col-span-1'
          title='Total Online donations'
          text={`GHS ${donationStats?.totalMomoDonations || 0}`}
        />
      </div>
      <div className='grid grid-cols-3 gap-3 2xl:gap-5'>
        <div className='col-span-2'>
          <h2 className='text-xl font-bold text-primary'>Recent donations</h2>
          <div className='py-5 space-y-5 overflow-auto max-h-[700px]'>
            {donations?.donations?.map((item: any, index: number) => (
              <DonationHistory index={index} key={item?._id} data={item} />
            ))}
          </div>
        </div>
        <div className=' flex flex-col gap-2'>
          <div
            style={{
              backgroundImage: 'url("/image/auth-bg.png")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className=' text-primary-foreground rounded-md flex-1'
          >
            <div className='p-5  bg-black/60 h-full rounded-md flex flex-col justify-between '>
              <div>
                <h2 className='text-lg font-medium font-sentient'>
                  Share Funeral Donation Details
                </h2>
                <p className='text-sm '>In Memory of {data?.nameOfDeceased}</p>
              </div>
              <div className='flex items-end gap-3  h-10'>
                <p className='bg-white/80 text-primary p-2 truncate rounded flex-1 '>
                  https://www.nsawa.com/{data?._id}
                </p>
                <div className='bg-white/80 text-primary px-2 h-full rounded flex justify-center items-center'>
                  <Clipboard />
                </div>
              </div>
            </div>
          </div>
          <CashCollection funeralDetails={data} />
          <AddMourner funeralDetails={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
