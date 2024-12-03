'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetPublicFuneralQuery } from '@/lib/features/funeralApiSlice';
import { useGetDonationStatusQuery } from '@/lib/features/donationsApiSlice';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

type PaymentStatus = 'idle' | 'pending' | 'success' | 'failed';

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { data } = useGetPublicFuneralQuery(params.id as string);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const donationId = searchParams.get('donationId');
  const { data: donationStatus, refetch } = useGetDonationStatusQuery(
    donationId ?? ''
  );

  console.log(donationStatus, 'test');
  useEffect(() => {
    if (donationStatus?.status === 'Paid') {
      setPaymentStatus('success');
    } else if (donationStatus?.status === 'failed') {
      setPaymentStatus('failed');
    } else {
      refetch();
    }
  }, [donationStatus]);
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold'>
            Thank you for your donation to
          </CardTitle>
          <CardDescription className='text-xl'>
            {data?.nameOfDeceased}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center space-y-6'>
          <div className='relative w-48 h-48 rounded-full overflow-hidden'>
            <Image
              src={data?.bannerImage}
              alt='Image of deceased'
              layout='fill'
              objectFit='cover'
              className='rounded-full'
            />
          </div>
          <p className='text-center text-muted-foreground max-w-md'>
            Thank you for your generous donation in memory of{' '}
            {data?.nameOfDeceased}. Your kindness and support during this
            difficult time mean more than words can express.
          </p>
        </CardContent>
        <CardFooter className='flex flex-col items-center space-y-4'>
          <p className='text-sm text-muted-foreground text-center'>
            Your contribution will help honor {data?.nameOfDeceased} memory and
            support the family. To complete your donation, please follow these
            steps:
          </p>
          <ol className='list-decimal list-inside text-sm text-muted-foreground text-left'>
            <li>You will receive a MOMO payment request on your device</li>
            <li>Confirm the payment on your device</li>
            <li>Wait for the confirmation on this page</li>
          </ol>
          <Alert
            className={`mt-4 w-full max-w-xs ${
              paymentStatus === 'success' && 'bg-green-500 text-white'
            }  ${paymentStatus === 'failed' && 'bg-red-500 text-white'}  ${
              paymentStatus === 'pending' && 'bg-yellow-500 text-white'
            }`}
          >
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>
              {paymentStatus === 'pending' && 'Payment Pending'}
              {paymentStatus === 'success' && 'Payment Successful'}
              {paymentStatus === 'failed' && 'Payment Failed'}
            </AlertTitle>
            <AlertDescription>
              {paymentStatus === 'pending' &&
                'Please confirm the payment on your device.'}
              {paymentStatus === 'success' && 'Thank you for your donation.'}
              {paymentStatus === 'failed' &&
                'Please try again or contact support.'}
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
}
