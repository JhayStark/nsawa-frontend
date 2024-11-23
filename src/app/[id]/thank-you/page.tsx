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
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const { data } = useGetPublicFuneralQuery(params.id as string);

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold'>
            Thank you for your donation to{' '}
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
            support the family.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
