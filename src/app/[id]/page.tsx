'use client';

import {
  useConfirmDonationOtpMutation,
  useGetPublicFuneralQuery,
} from '@/lib/features/funeralApiSlice';
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
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useGetKeyPersonsPublicQuery } from '@/lib/features/keyPersonsApiSlice';
import { useAddDonationPublicMutation } from '@/lib/features/donationsApiSlice';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Landmark } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmOtp] = useConfirmDonationOtpMutation();
  const [reference, setReference] = useState('');

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

  const handleSubmit = async (values: z.infer<typeof donationSchema>) => {
    const submitData = values;
    delete submitData?.isAnnouncement;
    await addDonation(submitData)
      .unwrap()
      .then(res => {
        setReference(res?.paymentReference);
        setShowOtpDialog(res?.showOtpModal);
        toast({
          title: 'Donation',
          description: 'Donation is being processed',
        });
      })
      .catch(() =>
        toast({
          title: 'Failed',
          description: 'Donation failed',
        })
      );
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    if (!otp || !reference) return;
    await confirmOtp({ otp, reference })
      .unwrap()
      .then(() => {
        toast({
          title: 'Donation',
          description: 'Donation is being processed',
        });
        setShowOtpDialog(false);
      })
      .catch(() => {
        setOtpError('Invalid OTP');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='max-w-7xl mx-auto items-center h-[100svh] flex py-5 xl:py-10 xl:gap-2'>
      <div className='max-w-[589px] flex flex-col xl:px-5 mx-auto overflow-x-hidden'>
        <h2 className='text-xl lg:text-2xl font-bold font-sans px-4 pt-5 pb-4'>
          {/* Donate to the {data?.familyName} family */}
          Funeral Donation
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
            className='max-w-[480px] px-2 lg:block flex flex-col justify-between  h-full'
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div>
              <ShadcnInputField
                form={form}
                name='amountDonated'
                label='Amount'
                formItemClassName=' py-2'
                // placeholder='GHC 0.00'
              />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-2 '>
                <ShadcnInputField
                  form={form}
                  name='donorName'
                  label='Name'
                  // placeholder='Your name'
                />
                <ShadcnInputField
                  form={form}
                  name='donorPhoneNumber'
                  label='Mobile money number'
                  // placeholder='Your phone number'
                />
              </div>
              <ShadcnSelectFormField
                form={form}
                name='keyPerson'
                options={keyPersons}
                className=''
                formItemClassName='py-2'
                // placeholder='Select Chief Mourner'
                label='Mourner'
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
                  // placeholder='Enter announcement here'
                  className='placeholder:text-primary'
                />
              )}
            </div>
            <Button
              className='w-full mt-14'
              variant='default'
              type='submit'
              form='donationForm'
            >
              Donate
            </Button>
          </form>
        </Form>
      </div>
      <div className=' hidden xl:block '>
        <Image
          src={data?.bannerImage}
          width={500}
          height={800}
          alt='deceaseds image'
          className='rounded-[8px] object-cover'
        />
      </div>
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>
              We&apos;ve sent a one-time password to your mobile number. Please
              enter it below to confirm your donation.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOtpSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='otp'>One-Time Password</Label>
              <Input
                id='otp'
                placeholder='Enter OTP'
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
              />
            </div>
            {otpError && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Sorry</AlertTitle>
                <AlertDescription>{otpError}</AlertDescription>
              </Alert>
            )}
            <DialogFooter>
              <Button type='submit' disabled={isLoading} className='w-full'>
                {isLoading ? 'Verifying...' : 'Confirm OTP'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
