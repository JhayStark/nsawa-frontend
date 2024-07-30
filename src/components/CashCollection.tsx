'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField, SelectFormField } from './ui/form-fields';
import { Form } from './ui/form';
import { Button } from './ui/button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetKeyPersonsQuery } from '@/lib/features/keyPersonsApiSlice';
import { useAddDonationMutation } from '@/lib/features/donationsApiSlice';
import { CircleX, HandCoins } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useSearchParams } from 'next/navigation';

const donationsSchema = z.object({
  donorName: z.string(),
  keyPerson: z.string(),
  donorPhoneNumber: z.string(),
  donorEmail: z.string(),
  amountDonated: z.string(),
  modeOfDonation: z.string(),
  funeralId: z.string(),
});

const CashCollection = ({ funeralDetails }: { funeralDetails: any }) => {
  const searchParams = useSearchParams();
  const openForm = searchParams.get('sub-form') || '';
  const params = new URLSearchParams(searchParams.toString());
  const [createDonation] = useAddDonationMutation();
  const { data, isLoading } = useGetKeyPersonsQuery(funeralDetails?._id || '');
  const form = useForm<z.infer<typeof donationsSchema>>({
    resolver: zodResolver(donationsSchema),
  });

  const keyPersons = useMemo(() => {
    return (
      data?.persons?.map((person: any) => ({
        label: person.name,
        value: person._id,
      })) || []
    );
  }, [data]);

  useEffect(() => {
    form.setValue('modeOfDonation', 'Cash');
    form.setValue('funeralId', funeralDetails?._id);
  }, [funeralDetails]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof donationsSchema>) => {
      createDonation(data)
        .unwrap()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },
    []
  );

  const handleOpen = () => {
    params.set('sub-form', 'recieve-donation');
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`
    );
  };

  const handleClose = () => {
    params.delete('sub-form');
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`
    );
  };

  return (
    <Collapsible
      open={openForm == 'recieve-donation'}
      onOpenChange={handleOpen}
      className=''
    >
      <CollapsibleTrigger asChild>
        {openForm !== 'recieve-donation' && (
          <Button className='h-14 space-x-5 w-full' variant='secondary'>
            <HandCoins />
            <p className='text-lg'>Recieve Cash Donation</p>
          </Button>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='border-2 border-primary rounded-lg p-5  h-[550px] flex justify-between flex-col'>
          <div className='relative'>
            <h2 className='text-center text-lg font-semibold'>
              Recieve Cash Donation
            </h2>
            <p className='text-sm text-center'>
              In Memory of {funeralDetails?.nameOfDeceased}
            </p>
            <CircleX
              className='absolute top-0 right-0 text-red-500 cursor-pointer'
              onClick={() => handleClose()}
            />
          </div>
          <Form {...form}>
            <form
              action=''
              onSubmit={form.handleSubmit(onSubmit)}
              id='cash-donation'
            >
              <InputField
                form={form}
                name='donorName'
                placeholder='Donor name'
                className='placeholder:text-primary'
              />
              <InputField
                form={form}
                name='donorPhoneNumber'
                placeholder='Donor mobile number'
                className='placeholder:text-primary'
              />
              <InputField
                form={form}
                name='donorEmail'
                placeholder='Donor email'
                className='placeholder:text-primary'
              />
              <SelectFormField
                form={form}
                name='keyPerson'
                placeholder='Select chief mourner'
                className='placeholder:text-primary'
                options={keyPersons}
              />
              <InputField
                form={form}
                name='amountDonated'
                placeholder='Amount recieved'
                className='placeholder:text-primary'
              />
            </form>
          </Form>
          <Button className='h-16 rounded-none w-full' form='cash-donation'>
            Recieve Donation
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CashCollection;
