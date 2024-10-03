import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import {
  useGetAccountInfoMutation,
  useGetBanksListQuery,
} from '@/lib/features/payestackApiSlice';
import { useGetDonationStatsQuery } from '@/lib/features/donationsApiSlice';
import { useParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export default function Withdrawal() {
  const params = useParams();
  const [withdrawalMethod, setWithdrawalMethod] = useState('mobile');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [verifyAccountDetails] = useGetAccountInfoMutation();
  const { data } = useGetBanksListQuery({
    type: withdrawalMethod == 'bank' ? '' : 'mobile_money',
  });
  const { data: stats } = useGetDonationStatsQuery(
    (params?.id as string) || ''
  );
  const [debouncedAccountNumber] = useDebounce(accountNumber, 500);

  const banks = useMemo(() => {
    return data?.data?.data || [];
  }, [data]);

  useEffect(() => {
    setAccountNumber('');
    setBankName('');
    setAccountName('');
  }, [withdrawalMethod]);

  // Simulated withdrawal amount (replace with actual system-determined amount)
  const withdrawalAmount = 1000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to verify account and process withdrawal
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    // Handle successful withdrawal here

    setShowOtpDialog(true);
  };

  const verifyAccount = async () => {
    setIsLoading(true);

    // Simulate API call to verify account
    // await new Promise(resolve => setTimeout(resolve, 1000));
    await verifyAccountDetails({ accountNumber, bankCode: bankName })
      .unwrap()
      .then(res => {
        // res.data;
        setAccountName(res?.data?.data?.account_name);
      })
      .catch(() => setIsLoading(false));

    setIsLoading(false);
  };

  useEffect(() => {
    // Check if the account number length is either 10 or 12 before triggering verification
    if (accountNumber.length === 10 || accountNumber.length === 12) {
      bankName && verifyAccount();
    }
  }, [debouncedAccountNumber]);

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOtpError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (otp === '123456') {
        // Replace with actual OTP verification logic
        // Simulate withdrawal process
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Withdrawal processed successfully');
        setShowOtpDialog(false);
        // Reset form or show success message
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      setOtpError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className='h-14 space-x-5 w-full flex justify-center items-center bg-primary text-white rounded-lg'>
            <Landmark />
            <p className='text-lg'>Withdraw Donation</p>
          </div>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='text-primary'>
              Withdraw Funeral Donations
            </DialogTitle>
            <DialogDescription>
              Choose your preferred withdrawal method and enter your details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue='mobile' onValueChange={setWithdrawalMethod}>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='mobile'>Mobile Money</TabsTrigger>
                <TabsTrigger value='bank'>Bank Transfer</TabsTrigger>
              </TabsList>
              <TabsContent value='mobile' className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='bankName'>Bank Name</Label>
                  <Select onValueChange={setBankName} required>
                    <SelectTrigger id='bankName'>
                      <SelectValue placeholder='Select your bank' />
                    </SelectTrigger>
                    <SelectContent>
                      {banks?.map((bank: any) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='mobileNumber'>Mobile Number</Label>
                  <Input
                    id='mobileNumber'
                    placeholder='Enter your mobile number'
                    value={accountNumber}
                    onChange={e => setAccountNumber(e.target.value)}
                    required
                  />
                </div>
              </TabsContent>
              <TabsContent value='bank' className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='bankName'>Bank Name</Label>
                  <Select onValueChange={setBankName} required>
                    <SelectTrigger id='bankName'>
                      <SelectValue placeholder='Select your bank' />
                    </SelectTrigger>
                    <SelectContent>
                      {banks?.map((bank: any) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='accountNumber'>Account Number</Label>
                  <Input
                    id='accountNumber'
                    placeholder='Enter your account number'
                    value={accountNumber}
                    onChange={e => setAccountNumber(e.target.value)}
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className='mt-4 space-y-4'>
              {/* <Button
                type='button'
                variant='outline'
                onClick={verifyAccount}
                disabled={isLoading || !bankName || !accountNumber}
              >
                {isLoading ? 'Verifying...' : 'Verify Account'}
              </Button> */}
              {accountName && (
                <div className='text-sm'>
                  <strong>Account Name:</strong> {accountName}
                </div>
              )}
              <div className='text-sm '>
                <strong>Donations recieved:</strong> GHS{' '}
                {stats?.totalDonations?.toFixed(2)}
              </div>
              <div className='text-sm '>
                <strong>Charges (6 %):</strong> GHS{' '}
                {stats?.totalDonations?.toFixed(2) * 0.06}
              </div>
              <div className='text-sm '>
                <strong>Withdrawal Amount:</strong> GHS{' '}
                {stats?.totalDonations?.toFixed(2) -
                  stats?.totalDonations?.toFixed(2) * 0.06}
              </div>
              <Button type='submit' disabled={isLoading || !accountName}>
                {isLoading ? 'Processing...' : 'Confirm Withdrawal'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>
              We&apos;ve sent a one-time password to the designated mobile
              number of the funeral. Please enter it below to confirm your
              withdrawal.
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
    </>
  );
}
