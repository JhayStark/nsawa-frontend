'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField, SelectFormField, TextField } from './ui/form-fields';
import { Form } from './ui/form';
import { Button } from './ui/button';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGetKeyPersonsQuery } from '@/lib/features/keyPersonsApiSlice';
import { useAddDonationMutation } from '@/lib/features/donationsApiSlice';
import { CircleX, HandCoins } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from './ui/checkbox';

const donationsSchema = z.object({
  donorName: z.string(),
  keyPerson: z.string().optional(),
  donorPhoneNumber: z.string(),
  amountDonated: z.string(),
  modeOfDonation: z.string(),
  funeralId: z.string(),
  announcement: z.string().optional(),
});

const CashCollection = ({ funeralDetails }: { funeralDetails: any }) => {
  const cashCollectionRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const openForm = searchParams.get('sub-form') || '';
  const params = new URLSearchParams(searchParams.toString());
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [createDonation] = useAddDonationMutation();
  const { data } = useGetKeyPersonsQuery(funeralDetails?._id || '');
  const { toast } = useToast();

  const donationDefaults = {
    modeOfDonation: 'Cash',
    funeralId: funeralDetails?._id,
    donorName: '',
    keyPerson: '',
    donorPhoneNumber: '',
    amountDonated: '',
    announcement: '',
  };

  const form = useForm<z.infer<typeof donationsSchema>>({
    resolver: zodResolver(donationsSchema),
    defaultValues: donationDefaults,
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
        .then(() => {
          toast({
            title: 'Donation recieved',
          });
          form.reset(donationDefaults);
        })
        .catch(err =>
          toast({
            title: 'Donation not recieved',
            variant: 'destructive',
          })
        );
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

  useEffect(() => {
    if (openForm === 'recieve-donation') {
      cashCollectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [openForm]);

  return (
    <Collapsible
      open={openForm == 'recieve-donation'}
      onOpenChange={handleOpen}
    >
      <CollapsibleTrigger asChild>
        {openForm !== 'recieve-donation' && (
          <div className='h-14 space-x-5 flex cursor-pointer justify-center items-center bg-secondary rounded-lg w-full'>
            <HandCoins />
            <p className='text-lg'>Recieve Cash Donation</p>
          </div>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          className='border-2 border-primary rounded-lg p-5  h-[550px] flex justify-between flex-col'
          ref={cashCollectionRef}
        >
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
              <div className='flex items-center space-x-2 my-3'>
                <Checkbox
                  id='announce'
                  onCheckedChange={() => setShowAnnouncement(prev => !prev)}
                  className='rounded-none'
                />
                <label
                  htmlFor='announce'
                  className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Announce donation
                </label>
              </div>
              {showAnnouncement && (
                <TextField
                  form={form}
                  name='announcement'
                  placeholder='Enter announcement here'
                  className='placeholder:text-primary'
                />
              )}
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
