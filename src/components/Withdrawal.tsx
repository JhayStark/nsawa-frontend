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
import {
  useGetWithdrawalOtpMutation,
  useVerifyWithdrawalOtpMutation,
} from '@/lib/features/funeralApiSlice';
import { useToast } from '@/components/ui/use-toast';
import { NoticeCard } from './ui/notice-card';

export default function Withdrawal() {
  const params = useParams();
  const [withdrawalMethod, setWithdrawalMethod] = useState('mobile_money');
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
  const [sendOtp] = useGetWithdrawalOtpMutation();
  const [verifyOtp] = useVerifyWithdrawalOtpMutation();
  const { toast } = useToast();
  const [step, setStep] = useState<'notice' | 'withdrawal'>('notice');

  const [debouncedAccountNumber] = useDebounce(accountNumber, 500);

  const banks = useMemo(() => {
    return data?.data?.data || [];
  }, [data]);

  useEffect(() => {
    setAccountNumber('');
    setBankName('');
    setAccountName('');
  }, [withdrawalMethod]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendOtp(params.id as string).unwrap();
      toast({
        title: 'OTP sent successfully',
      });
      setShowOtpDialog(true);
    } catch (error) {
      toast({
        title: 'Error sending OTP',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAccount = async () => {
    setIsLoading(true);

    // Simulate API call to verify account
    await verifyAccountDetails({ accountNumber, bankCode: bankName })
      .unwrap()
      .then(res => {
        setAccountName(res?.data?.data?.account_name);
      })
      .catch(() => setIsLoading(false));

    setIsLoading(false);
  };

  useEffect(() => {
    // Check if the account number length is either 10 or 12 before triggering verification
    if (
      accountNumber.length === 10 ||
      accountNumber.length === 12 ||
      accountNumber.length > 12
    ) {
      bankName && verifyAccount();
    }
  }, [debouncedAccountNumber]);

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOtpError('');

    try {
      const data = {
        type: withdrawalMethod,
        name: accountName,
        currency: 'GHS',
        account_number: accountNumber,
        bank_code: bankName,
        reason: 'Donation withdrawal',
        amount:
          stats?.totalMomoDonations?.toFixed(2) -
          stats?.totalMomoDonations?.toFixed(2) * 0.06,
        otp,
        funeralId: params.id as string,
      };
      await verifyOtp(data).unwrap();
      toast({
        title: 'Withdrawal successful',
      });
      setShowOtpDialog(false);
    } catch (error) {
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
        <DialogContent className='sm:max-w-[425px] md:max-w-xl'>
          <DialogHeader>
            <DialogTitle className='text-primary'>
              Withdraw Funeral Donations
            </DialogTitle>
            {/* <DialogDescription>
              Choose your preferred withdrawal method and enter your details.
            </DialogDescription> */}
          </DialogHeader>
          <NoticeCard
            variant='info'
            title='Withdrawal notice'
            items={[
              'Withdrawals can only be made 2 days after the funeral end date',
              'Withdrawals are processed within 24 hours.',
              'Contact info@nsawa-digital.com for any issues or enquiry',
            ]}
          />
          <form onSubmit={handleSubmit}>
            <Tabs
              defaultValue='mobile_money'
              onValueChange={setWithdrawalMethod}
            >
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='mobile_money'>Mobile Money</TabsTrigger>
                <TabsTrigger value='bank'>Bank Transfer</TabsTrigger>
              </TabsList>
              <TabsContent value='mobile_money' className='space-y-4'>
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
              {accountName && (
                <div className='text-sm'>
                  <strong>Account Name:</strong> {accountName}
                </div>
              )}
              <div className='text-sm '>
                <strong>Donations recieved:</strong> GHS{' '}
                {stats?.totalMomoDonations?.toFixed(2)}
              </div>
              <div className='text-sm '>
                <strong>Charges (6 %):</strong> GHS{' '}
                {stats?.totalMomoDonations?.toFixed(2) * 0.06}
              </div>
              <div className='text-sm '>
                <strong>Withdrawal Amount:</strong> GHS{' '}
                {stats?.totalMomoDonations?.toFixed(2) -
                  stats?.totalMomoDonations?.toFixed(2) * 0.06}
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
