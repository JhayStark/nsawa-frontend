'use client';

import CashCollection from '@/components/CashCollection';
import DonationHistory from '@/components/DonationHistory';
import { CalendarIcon, MapPinIcon, Share2, UserPlus } from 'lucide-react';
import { useGetFuneralQuery } from '@/lib/features/funeralApiSlice';
import { useSearchParams, useParams } from 'next/navigation';
import {
  useGetDonationsQuery,
  useGetDonationStatsQuery,
} from '@/lib/features/donationsApiSlice';
import AddMourner from '@/components/AddMourner';
import { formatDateToString } from '@/lib/helpers';
import QRCode from 'react-qr-code';
import MournersList from '@/components/MournersList';

const Page = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const { data } = useGetFuneralQuery(params.id as string);
  console.log(data);

  return (
    <div className=' font-sentient h-full flex'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 w-full'>
        <div
          className='w-full flex-1 lg:col-span-2 h-full  rounded-md'
          style={{
            backgroundImage: `url(${data?.bannerImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className='bg-black opacity-55 h-full w-full rounded-md'>
            <div className='text-white h-full p-5 flex flex-col justify-between '>
              <div>
                <div>
                  <h2 className='xl:text-lg'>Funeral of the late</h2>
                  <h3 className='text-2xl xl:text-4xl'>
                    {data?.nameOfDeceased}
                  </h3>
                </div>
                <p className='xl:text-lg'>
                  {data?.yearOfBirth} - {data?.yearOfDeath}
                </p>
              </div>
              <div className='flex sm:flex-row flex-col gap-10 items-end justify-between '>
                <div className='text-secondary text-lg'>
                  <div className='flex items-center gap-2'>
                    <MapPinIcon className='h-5 w-5 ' />
                    <div className=''>{data?.funeralLocation}</div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <CalendarIcon className='h-5 w-5 ' />
                    <div className=''>
                      From {formatDateToString(data?.startDate)} to{' '}
                      {formatDateToString(data?.endDate)}
                    </div>
                  </div>
                </div>
                {/* <Button className='text-green-300'>Withdraw Donations</Button> */}
              </div>
            </div>
          </div>
        </div>
        <div className=' flex flex-col gap-2'>
          <div className='grid-cols-2 grid gap-2 w-full'>
            <DonationHistory funeralDetails={data} />
            <MournersList funeralDetails={data} />
          </div>
          <div
            style={{
              backgroundImage: 'url("/image/auth-bg.png")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className=' text-primary-foreground rounded-md flex-1'
          >
            <div className='p-5 gap-5  bg-black/60 h-full rounded-md flex flex-col justify-between '>
              <div>
                <h2 className='text-lg font-medium font-sentient'>
                  Share Funeral Donation Details
                </h2>
                <p className='text-sm '>In Memory of {data?.nameOfDeceased}</p>
              </div>
              <div
                style={{
                  height: 'auto',
                  margin: 'auto',
                  maxWidth: 64,
                  width: '100%',
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={`https://www.nsawa.com/${data?._id}`}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div className='flex items-end gap-3  h-10'>
                <p className='bg-white/80 text-primary p-2 truncate rounded flex-1 '>
                  https://www.nsawa.com/{data?._id}
                </p>
                <div className='bg-white/80 text-primary px-2 h-full rounded flex justify-center items-center'>
                  <Share2 />
                </div>
              </div>
            </div>
          </div>
          <CashCollection funeralDetails={data} />
          <AddMourner funeralDetails={data} />
          {/* <Button>Withdraw Cash</Button> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
