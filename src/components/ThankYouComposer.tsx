'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useSendThankYouMessageMutation } from '@/lib/features/donationsApiSlice';

export default function ThankYouComposer({
  funeralId,
}: Readonly<{ funeralId: string }>) {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [sendThankYouMessage] = useSendThankYouMessageMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendThankYouMessage({
      funeralId,
      message,
    }).unwrap();
    toast({
      title: 'Thank you message sent',
      description: 'Your message has been successfully sent to the donor.',
    });
    setMessage('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' className=' text-primary'>
          <span className='hidden md:block'>Compose Appreciation Message</span>
          <span className='md:hidden '>Compose Message</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] lg:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Compose Appreciation Message</DialogTitle>
          <DialogDescription>
            Write a heartfelt thank you message to send to your donors. Click
            compose when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='message'>Message</Label>
              <Textarea
                id='message'
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder='Dear donor, thank you for your generous contribution...'
                className='h-40'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Compose</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
