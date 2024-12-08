'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PhoneCall, Hourglass } from 'lucide-react';

interface FuneralEndedModalProps {
  phoneNumber: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function FuneralEndedModal({
  phoneNumber,
  isOpen,
  onClose,
}: FuneralEndedModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
            <Hourglass className='h-6 w-6 text-gray-600' />
          </div>
          <DialogTitle className='text-center'>Funeral Ended</DialogTitle>
          <DialogDescription className='text-center'>
            Thank you for your support
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center space-y-4'>
          <p className='text-center'>
            We regret to inform you that the funeral service has ended and we
            are no longer accepting donations at this time.
          </p>
          <p className='text-center font-medium'>
            For any inquiries, please contact:
          </p>
          <p className='text-center text-lg font-bold'>{phoneNumber}</p>
          <Button
            variant='outline'
            className='flex items-center'
            onClick={() => (window.location.href = `tel:${phoneNumber}`)}
          >
            <PhoneCall className='mr-2 h-4 w-4' />
            Call Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
