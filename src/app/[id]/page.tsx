'use client';

import { useGetFuneralQuery } from '@/lib/features/funeralApiSlice';
import { formatDateToString } from '@/lib/helpers';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import {
  InputField,
  SelectFormField,
  ShadcnInputField,
  ShadcnSelectFormField,
} from '@/components/ui/form-fields';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Button } from '@/components/ui/button';
import CarouselComponent from '@/components/CarouselComponent';
import Image from 'next/image';
import { useMemo } from 'react';
import { usePaystackPayment } from 'react-paystack';

const config = {
  reference: new Date().getTime().toString(),
  email: 'user@example.com',
  amount: 20, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: 'pk_test_db4e09868b49d7f59f8fe2987a46ff07379e5ab2',
  currency: 'GHS',
};

const donationSchema = z.object({
  name: z.string(),
  keyPerson: z.string(),
  funeralId: z.string(),
  donorPhoneNumber: z.string(),
  amountDonated: z.string(),
  announcement: z.string(),
});

const Page = () => {
  const params = useParams();
  const { data } = useGetFuneralQuery(params.id as string);
  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
  });
  const initializePayment = usePaystackPayment(config);

  const imagesOfDeceased = useMemo(() => {
    if (data?.imagesOfDeceased?.length) {
      return [...data?.imagesOfDeceased, data?.bannerImage];
    } else {
      return [];
    }
  }, [data]);

  const onSuccess = reference => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  return (
    <div className='max-w-7xl mx-auto   flex py-5 xl:py-10 xl:gap-2'>
      <div className='max-w-[589px] xl:px-5 mx-auto'>
        <h2 className='text-xl font-bold font-sans px-4 pt-5 pb-4'>
          Donate to the {data?.familyName} family
        </h2>
        <div className='px-4 py-2 space-x-4 flex items-center'>
          <Image
            src={data?.bannerImage}
            width={56}
            height={56}
            alt='deceaseds image'
            className='rounded-[8px]'
          />
          <div className=''>
            <h3 className='font-medium'>
              In loving memory of {data?.nameOfDeceased}
            </h3>
            <p className='text-[#4F7396] text-sm'>
              Your donation will help the {data?.familyName}s.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form action='' className='max-w-[480px] px-4 space-y-2'>
            <ShadcnInputField
              form={form}
              name='amountDonated'
              label='Donation amount'
              formItemClassName=' py-2'
              placeholder='GHC 0.00'
            />
            <div className='grid grid-cols-2 gap-4 py-2 '>
              <ShadcnInputField
                form={form}
                name='name'
                label='Name'
                placeholder='Your name'
              />
              <ShadcnInputField
                form={form}
                name='donorPhoneNumber'
                label='Phone Number'
                placeholder='Your phone number'
              />
            </div>
            <ShadcnSelectFormField
              form={form}
              name='keyPerson'
              options={[]}
              className=''
              formItemClassName='py-2'
              placeholder='Select Chief Mourner'
              label='Chief Mourner'
            />
            <div className='flex items-center space-x-2 py-2'>
              <input type='checkbox' name='announce' id='announce' />
              <label htmlFor='announce' className=''>
                I would like my donation to be announced.
              </label>
            </div>
            <h2 className='text-xl font-bold font-sans pt-5 pb-4'>
              Payment Method
            </h2>

            <ul className='py-4'>
              <li className='border px-4 py-[10.5px] w-fit rounded-md'>
                MTN Momo
              </li>
            </ul>

            <Button
              className='w-full'
              variant='secondary'
              type='button'
              onClick={() => {
                initializePayment(onSuccess, onClose);
              }}
            >
              Donate
            </Button>
          </form>
        </Form>
      </div>

      <div className='flex-1 hidden xl:block'>
        <CarouselComponent
          images={imagesOfDeceased}
          showThumbs={false}
          swipeable={true}
        />
      </div>
    </div>
  );
};

export default Page;
