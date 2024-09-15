'use client';

import { useGetPublicFuneralQuery } from '@/lib/features/funeralApiSlice';
import { useParams } from 'next/navigation';
import {
  ShadcnCheckBox,
  ShadcnInputField,
  ShadcnSelectFormField,
  TextField,
} from '@/components/ui/form-fields';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import CarouselComponent from '@/components/CarouselComponent';
import Image from 'next/image';
import { useMemo } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useGetKeyPersonsPublicQuery } from '@/lib/features/keyPersonsApiSlice';
import { useAddDonationPublicMutation } from '@/lib/features/donationsApiSlice';
import { useToast } from '@/components/ui/use-toast';

const donationSchema = z.object({
  donorName: z.string(),
  keyPerson: z.string(),
  funeralId: z.string(),
  donorPhoneNumber: z.string(),
  amountDonated: z.string(),
  announcement: z.string().optional(),
  modeOfDonation: z.string(),
  reference: z.string().optional(),
  isAnnouncement: z.boolean().optional(),
});

const Page = () => {
  const params = useParams();
  const { data } = useGetPublicFuneralQuery(params.id as string);
  const { data: keyPersonsData } = useGetKeyPersonsPublicQuery(
    params.id as string
  );
  const [addDonation] = useAddDonationPublicMutation();
  const { toast } = useToast();

  const keyPersons = useMemo(() => {
    return (
      keyPersonsData?.persons?.map((person: any) => ({
        label: person.name,
        value: person._id,
      })) || []
    );
  }, [keyPersonsData]);

  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      funeralId: params.id as string,
      modeOfDonation: 'Online',
      isAnnouncement: false,
      reference: new Date().getTime().toString(),
    },
  });

  const config = {
    reference: form.watch('reference'),
    email: `${form.watch('donorPhoneNumber')}@nsawa.com`,
    amount: parseInt(form.watch('amountDonated')) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK as string,
    currency: 'GHS',
  };

  const initializePayment = usePaystackPayment(config);

  const imagesOfDeceased = useMemo(() => {
    if (data?.imagesOfDeceased?.length) {
      return [...data?.imagesOfDeceased, data?.bannerImage];
    } else {
      return [];
    }
  }, [data]);

  const onSuccess = () => {
    // Implementation for whatever you want to do with reference and after success call.
    toast({
      title: 'Success',
      description: 'Donation successful',
    });
    form.reset();
  };

  const handleSubmit = async (values: z.infer<typeof donationSchema>) => {
    const submitData = values;
    delete submitData?.isAnnouncement;
    await addDonation(submitData)
      .unwrap()
      .then(() => {
        initializePayment({ onSuccess });
      })
      .catch(() =>
        toast({
          title: 'Failed',
          description: 'Donation failed',
        })
      );
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
          <form
            id='donationForm'
            className='max-w-[480px]   px-4 space-y-2'
            onSubmit={form.handleSubmit(handleSubmit)}
          >
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
                name='donorName'
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
              options={keyPersons}
              className=''
              formItemClassName='py-2'
              placeholder='Select Chief Mourner'
              label='Chief Mourner'
            />
            <ShadcnCheckBox
              form={form}
              name='isAnnouncement'
              label='I would like my donation to be announced.'
            />
            {form.watch('isAnnouncement') && (
              <TextField
                form={form}
                name='announcement'
                placeholder='Enter announcement here'
                className='placeholder:text-primary'
              />
            )}
          </form>
        </Form>
        <Button
          className='w-full mt-14 mx-1'
          variant='secondary'
          type='submit'
          form='donationForm'
        >
          Donate
        </Button>
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
