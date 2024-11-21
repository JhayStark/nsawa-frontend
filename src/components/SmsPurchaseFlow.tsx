'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  useAddSmsToFuneralMutation,
  useIntitateSubscriptionPaymentMutation,
} from '@/lib/features/funeralApiSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from './ui/use-toast';

interface SMSPlan {
  name: string;
  price: number;
  messages: number;
  features: string[];
}

const smsPlanData: SMSPlan[] = [
  {
    name: 'Basic',
    price: 99.99,
    messages: 700,
    features: ['Appreciation SMS', 'Automated thank you messages'],
  },
  {
    name: 'Standard',
    price: 190,
    messages: 3000,
    features: ['Appreciation SMS', 'Automated thank you messages'],
  },
  {
    name: 'Premium',
    price: 290,
    messages: 7500,
    features: ['Appreciation SMS', 'Automated thank you messages'],
  },
];

export function SmsPurchaseFlow({
  funeralId,
  open,
  handler,
}: Readonly<{
  funeralId: string;
  open: boolean;
  handler?: any;
}>) {
  const router = useRouter();
  const [confirmPayment] = useAddSmsToFuneralMutation();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'select' | 'payment' | 'confirm'>('select');
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(
    undefined
  );
  const [selectedPlanData, setSelectedPlanData] = useState<any>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [initiatePayment] = useIntitateSubscriptionPaymentMutation();
  const { toast } = useToast();
  const paymentReference = searchParams.get('paymentReference');
  const [showFLow, setShowFLow] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = smsPlanData.find(plan => plan.name === planId);
    setSelectedPlanData(plan);
    setStep('payment');
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const submitData = {
        phoneNumber: mobileNumber,
        amount: 1 || selectedPlanData.price,
        sms: selectedPlanData.messages,
        funeralId: funeralId,
      };
      console.log(submitData, 'submit data');
      const data = await initiatePayment(submitData).unwrap();
      router.push(
        `?paymentReference=${data?.paymentReference}&funerlaId=${funeralId}`
      );
      setStep('confirm');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Payment Failed',
        description: 'Please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await confirmPayment({
        funeralId,
        reference: paymentReference as string,
      }).unwrap();
      setShowFLow(false);
      router.push(`/app/funerals/${funeralId}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Payment Failed',
        description: 'Please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setShowFLow(open);
  }, [open]);

  return (
    <Dialog
      open={showFLow}
      onOpenChange={() => {
        setShowFLow(prev => !prev);
        if (handler) {
          handler((prev: any) => !prev);
        }
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {step === 'select'
              ? 'Choose a Plan'
              : step === 'payment'
              ? 'Payment Details'
              : 'Confirmation'}
          </DialogTitle>
          <DialogDescription>
            {step === 'select'
              ? 'Select a subscription plan that suits your needs.'
              : step === 'payment'
              ? 'Enter your payment information to subscribe.'
              : 'Your subscription is almost complete!'}
          </DialogDescription>
        </DialogHeader>
        {step === 'select' && (
          <RadioGroup
            defaultValue={selectedPlan ?? undefined}
            onValueChange={handlePlanSelect}
          >
            {smsPlanData.map(plan => (
              <Card key={plan.name}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <div className='space-y-2'>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      GHS{plan.price.toFixed(2)}
                    </CardDescription>
                  </div>
                  <RadioGroupItem value={plan.name} id={plan.name} />
                </CardHeader>
                <CardContent>
                  <p className='mb-2 font-semibold'>{plan.messages} messages</p>
                  <ul className='space-y-1'>
                    {plan.features.map(feature => (
                      <li key={feature} className='flex items-center'>
                        <Check className='mr-2 h-4 w-4 text-primary' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        )}
        {step === 'payment' && (
          <form className='space-y-2'>
            <label
              htmlFor='mobileNumber'
              className='block text-sm font-medium text-gray-700'
            >
              Mobile Money Number
            </label>
            <Input
              type='tel'
              id='mobileNumber'
              value={mobileNumber}
              onChange={e => setMobileNumber(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
              placeholder='Enter your mobile money number'
              required
            />
            <Button
              className='w-full'
              onClick={handlePayment}
              disabled={!mobileNumber}
              type='button'
            >
              {isLoading ? 'Verifying...' : 'Pay Now'}
            </Button>
          </form>
        )}
        {step === 'confirm' && (
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='rounded-full bg-green-500 p-2'>
              <Check className='h-6 w-6 text-white' />
            </div>
            <p className='text-center text-lg font-semibold'>
              Payment Initiated!
            </p>
            <p className='text-gray-600 text-sm text-center'>
              Click confirm payment once you have authorised the transaction on
              your device
            </p>
            <Button onClick={handleConfirm}>
              {' '}
              {isLoading ? 'Verifying...' : 'Confirm payment'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
