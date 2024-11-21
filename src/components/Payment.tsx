import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { useIntitateSubscriptionPaymentMutation } from '@/lib/features/funeralApiSlice';
import { useParams, useRouter } from 'next/navigation';

const Payment = ({ selectedPlan, funeralId }: any) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const [initiatePayment] = useIntitateSubscriptionPaymentMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const params = useParams();

  const handlePayment = async () => {
    console.log(selectedPlan, 'selected plan');
    try {
      const submitData = {
        phoneNumber: mobileNumber,
        amount: 1 || selectedPlan.price,
        sms: selectedPlan.messages,
        funeralId: funeralId || params?.id,
      };
      console.log(submitData, 'submit data');
      const data = await initiatePayment(submitData).unwrap();
      router.push(
        `?showOtpModal=${data?.showOtpModal}&paymentReference=${data?.paymentReference}&funerlaId=${funeralId}`
      );
      setShowConfirm(true);
      console.log(data, 'data from end point');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Payment Failed',
        description: 'Please try again later',
      });
    }
    console.log(
      `Initiating payment for ${selectedPlan} plan with mobile number: ${mobileNumber}`
    );

    // Here you would typically integrate with a payment gateway
  };
  return (
    <div className='py-4'>
      <h3 className='mb-4 text-lg font-semibold'>Enter Mobile Money Details</h3>
      <div className='space-y-4'>
        <div className='flex items-center space-x-4'>
          <span className='font-medium'>Selected Plan:</span>
          <span>{selectedPlan.name}</span>
        </div>
        <div className='flex items-center space-x-4'>
          <span className='font-medium'>Plan Price:</span>
          <span>GHS{selectedPlan.price}</span>
        </div>
        <div className='space-y-2'>
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
        </div>
        <Button
          className='w-full'
          onClick={handlePayment}
          disabled={!mobileNumber}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default Payment;
