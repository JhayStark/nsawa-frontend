import React, { useEffect, useState } from 'react';
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
import { useSearchParams, useRouter } from 'next/navigation';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useConfirmDonationOtpMutation } from '@/lib/features/funeralApiSlice';

const OtpConfirm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(true);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [confirmOtp] = useConfirmDonationOtpMutation();
  const paymentReference = searchParams.get('paymentReference');

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await confirmOtp({
        otp,
        paymentReference: paymentReference as string,
      }).unwrap();
    } catch (error) {
      setOtpError('Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  //   useEffect(() => {
  //     const showOtpModal = searchParams.get('showOtpModal');
  //     setShowOtpDialog(showOtpModal == 'true');
  //   }, [searchParams]);
  return (
    <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>
            We&apos;ve sent a one-time password to your phone to confirm your
            transaction.
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
  );
};

export default OtpConfirm;
