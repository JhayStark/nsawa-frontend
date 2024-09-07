import { useState } from 'react';
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

export default function Withdrawal() {
  const [withdrawalMethod, setWithdrawalMethod] = useState('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    setAccountName(withdrawalMethod === 'mobile' ? 'John Doe' : 'Jane Smith');
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className='h-14 space-x-5 w-full' variant='default'>
          <Landmark />
          <p className='text-lg'>Withdraw Donation</p>
        </Button>
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
                <Label htmlFor='mobileNumber'>Mobile Number</Label>
                <Input
                  id='mobileNumber'
                  placeholder='Enter your mobile number'
                  value={mobileNumber}
                  onChange={e => setMobileNumber(e.target.value)}
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
                    <SelectItem value='bank1'>Bank 1</SelectItem>
                    <SelectItem value='bank2'>Bank 2</SelectItem>
                    <SelectItem value='bank3'>Bank 3</SelectItem>
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
              disabled={
                isLoading ||
                (withdrawalMethod === 'mobile'
                  ? !mobileNumber
                  : !bankName || !accountNumber)
              }
            >
              {isLoading ? 'Verifying...' : 'Verify Account'}
            </Button>
            {accountName && (
              <div className='text-sm'>
                <strong>Account Name:</strong> {accountName}
              </div>
            )}
            <div className='text-sm'>
              <strong>Withdrawal Amount:</strong> ${withdrawalAmount.toFixed(2)}
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
