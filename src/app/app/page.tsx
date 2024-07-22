import CashCollection from '@/components/CashCollection';
import DonationHistory from '@/components/DonationHistory';
import StatsCard from '@/components/StatsCard';
import { Clipboard } from 'lucide-react';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Page = () => {
  return (
    <div className=' space-y-8 font-sentient'>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 2xl:gap-5 col-span-3'>
        <StatsCard
          className=' bg-secondary'
          title='Total donors'
          text='70 donors'
        />
        <StatsCard
          text='$ 40,000'
          className='bg-primary text-white'
          title='Total donations'
        />

        <StatsCard
          className='border-2 border-primary col-span-2 lg:col-span-1'
          title='Total Online donations'
          text='$ 40,000'
        />
      </div>
      <div className='grid grid-cols-3 gap-3 2xl:gap-5'>
        <div className='col-span-2'>
          <h2 className='text-xl font-bold text-primary'>Recent donations</h2>
          <div className='py-5 space-y-5 overflow-auto max-h-[700px]'>
            {array?.map((item, index) => (
              <DonationHistory index={index} key={item} />
            ))}
          </div>
        </div>
        <div className=' flex flex-col gap-5'>
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
                <p className='text-sm '>In Memory of `deceaseds name`</p>
              </div>
              <div className='flex items-end gap-3  h-10'>
                <p className='bg-white/80 text-primary p-2 rounded flex-1 '>
                  https://www.funeral-donations.com
                </p>
                <div className='bg-white/80 text-primary px-2 h-full rounded flex justify-center items-center'>
                  <Clipboard />
                </div>
              </div>
            </div>
          </div>
          <CashCollection />
        </div>
      </div>
    </div>
  );
};

export default Page;
