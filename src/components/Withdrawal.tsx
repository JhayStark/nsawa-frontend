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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Landmark } from 'lucide-react';
import {
  useGetAccountInfoMutation,
  useGetBanksListQuery,
} from '@/lib/features/payestackApiSlice';
import { useGetDonationStatsQuery } from '@/lib/features/donationsApiSlice';
import { useParams } from 'next/navigation';

export default function Withdrawal() {
  const params = useParams();
  const [withdrawalMethod, setWithdrawalMethod] = useState('mobile');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifyAccountDetails] = useGetAccountInfoMutation();
  const { data } = useGetBanksListQuery({
    type: withdrawalMethod == 'bank' ? '' : 'mobile_money',
  });
  const { data: stats } = useGetDonationStatsQuery(
    (params?.id as string) || ''
  );

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
  };

  const verifyAccount = async () => {
    setIsLoading(true);

    // Simulate API call to verify account
    await new Promise(resolve => setTimeout(resolve, 1000));
    await verifyAccountDetails({ accountNumber, bankCode: bankName })
      .unwrap()
      .then(res => {
        // res.data;
        setAccountName(res?.data?.data?.account_name);
      });

    setIsLoading(false);
  };

  return (
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
            <Button
              type='button'
              variant='outline'
              onClick={verifyAccount}
              disabled={isLoading || !bankName || !accountNumber}
            >
              {isLoading ? 'Verifying...' : 'Verify Account'}
            </Button>
            {accountName && (
              <div className='text-sm'>
                <strong>Account Name:</strong> {accountName}
              </div>
            )}
            <div className='text-sm '>
              <strong>Withdrawal Amount:</strong> GHS{' '}
              {stats?.totalDonations?.toFixed(2)}
            </div>
            <Button type='submit' disabled={isLoading || !accountName}>
              {isLoading ? 'Processing...' : 'Confirm Withdrawal'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
