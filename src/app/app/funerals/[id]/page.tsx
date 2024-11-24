'use client';

import CashCollection from '@/components/CashCollection';
import DonationHistory from '@/components/DonationHistory';
import { CalendarIcon, ImageDown, MapPinIcon, Share2 } from 'lucide-react';
import { useGetFuneralQuery } from '@/lib/features/funeralApiSlice';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import AddMourner from '@/components/AddMourner';
import { formatDateToString } from '@/lib/helpers';
import MournersList from '@/components/MournersList';
import Withdrawal from '@/components/Withdrawal';
import { useEffect, useMemo, useState } from 'react';
import ThankYouComposer from '@/components/ThankYouComposer';
import { Button } from '@/components/ui/button';
import { SmsPurchaseFlow } from '@/components/SmsPurchaseFlow';
import { useToast } from '@/components/ui/use-toast';
import DonationTable from '@/components/DonationsTable';

const Page = () => {
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const params = useParams();
  const { data } = useGetFuneralQuery(params.id as string);
  const subFormOpen = useMemo(
    () => urlParams.get('sub-form')?.toString(),
    [searchParams]
  );
  const { toast } = useToast();
  const [showSmsTop, setShowSmsTop] = useState(false);
  const [showDonations, setShowDonations] = useState(true);

  useEffect(() => {
    if (data?.balance < 20) {
      setShowSmsTop(true);
    }
  }, [data]);

  return (
    <div className=' font-sentient h-full flex'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 w-full'>
        {!showDonations ? (
          <div
            className='w-full flex-1 lg:col-span-2 h-full rounded-md'
            style={{
              backgroundImage: `url(${data?.bannerImage})`,
              backgroundSize: '100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='bg-black bg-opacity-60 rounded-md h-full w-full'>
              <div className='text-white h-full p-3 lg:p-5 flex flex-col justify-between '>
                <div className='flex justify-between'>
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
                  <Button
                    type='button'
                    variant='secondary'
                    className={`text-primary text-sm ${
                      data?.balance < 20 &&
                      'animate-pulse bg-red-500 text-white'
                    }`}
                    onClick={() => setShowSmsTop(true)}
                  >
                    SMS Balance: {data?.balance}
                  </Button>
                </div>

                <div className='flex sm:flex-row flex-col gap-10 items-end justify-between '>
                  <div className='text-secondary w-full lg:w-fit flex justify-between pt-3 lg:0 lg:block text-lg'>
                    <div className='flex items-center gap-x-2'>
                      <MapPinIcon className='h-5 w-5' />
                      <div className='text-sm'>{data?.funeralLocation}</div>
                    </div>
                    <div className='hidden lg:flex items-center gap-2 mt-2'>
                      <CalendarIcon className='h-5 w-5 ' />
                      <div className='text-sm'>
                        <span>From</span>{' '}
                        <span>{formatDateToString(data?.startDate)}</span>{' '}
                        <span>to</span>{' '}
                        <span>{formatDateToString(data?.endDate)}</span>
                      </div>
                    </div>
                  </div>
                  <ThankYouComposer funeralId={params?.id as string} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full flex-1 lg:col-span-2 h-full rounded-md'>
            <DonationTable funeralDetails={data} />
          </div>
        )}
        <div className=' flex flex-col gap-2 pb-3 lg:pb-0'>
          <div className='grid-cols-2 grid gap-2 w-full'>
            <Button
              variant='default'
              className='gap-3'
              type='button'
              onClick={() => setShowDonations(prev => !prev)}
            >
              {showDonations ? 'Hide' : 'Show'} Donations
            </Button>
            <MournersList funeralDetails={data} />
          </div>
          <div
            style={{
              backgroundImage: 'url("/image/auth-bg.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            className=' text-primary-foreground rounded-md flex-1'
          >
            <div className='p-5 gap-5  bg-black/60 h-full rounded-md flex flex-col justify-between '>
              <div>
                <h2
                  className={` ${
                    subFormOpen && 'lg:hidden'
                  } font-medium font-sentient `}
                >
                  Share Funeral Donation Details
                </h2>
                <p className='text-sm '>In Memory of {data?.nameOfDeceased}</p>
              </div>
              <div
                className={`flex flex-col justify-center items-center ${
                  subFormOpen && 'lg:hidden'
                }`}
              >
                <ImageDown
                  size={100}
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${data?._id}/qr-code`
                    )
                  }
                  className='cursor-pointer'
                />
                <p>Funeral QR code</p>
              </div>
              <div className='flex items-end gap-3  h-10'>
                <p className='bg-white/80 text-primary p-2 truncate rounded flex-1 '>
                  {process.env.NEXT_PUBLIC_FRONTEND_URL}/{data?._id}
                </p>
                <div className='bg-white/80 text-primary px-2 h-full rounded flex justify-center items-center'>
                  <Share2
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${data?._id}`
                      );
                      toast({
                        title: 'Copied to clipboard',
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <CashCollection funeralDetails={data} />
          <AddMourner funeralDetails={data} />
          <Withdrawal />
          <SmsPurchaseFlow
            open={showSmsTop}
            funeralId={params?.id as string}
            handler={setShowSmsTop}
          />
        </div>
        {/* <DonorSMSSubscriptionPopup funeral={data} /> */}
      </div>
    </div>
  );
};

export default Page;
