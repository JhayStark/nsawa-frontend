import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { useAddSmsToFuneralMutation } from '@/lib/features/funeralApiSlice';

const ConfirmSubscription = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [confirmPayment] = useAddSmsToFuneralMutation();
  const paymentReference = searchParams.get('paymentReference');
  const funeralId = searchParams.get('funeralId');
  const transactionType = searchParams.get('transactionType');
  const showOtpModal = searchParams.get('showOtpModal');

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    try {
      const data = await confirmPayment({
        funeralId,
        reference: paymentReference as string,
      }).unwrap();
      console.log(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setShowConfirmation(transactionType == 'sub');
  }, [transactionType]);

  return (
    <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            Complete the transaction by completeing the payment prompt displayed
            on your device. Once done click confirm payment to complete the
            transaction
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type='button'
            onClick={() => handleConfirmPayment()}
            disabled={isLoading}
            className='w-full'
          >
            {isLoading ? 'Verifying...' : 'Confirm Payment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmSubscription;
