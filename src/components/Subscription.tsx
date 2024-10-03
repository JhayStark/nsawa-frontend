'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, MessageSquare, X } from 'lucide-react';

// Mock user object
const user = {
  name: 'John Doe',
  subscription: null, // Set to null to simulate no subscription
};

// Updated subscription plans
const subscriptionPlans = [
  { id: 'basic', name: 'Basic', price: 'GHS 99.99', smsLimit: 700 },
  { id: 'standard', name: 'Standard', price: 'GHS 190', smsLimit: 3000 },
  { id: 'premium', name: 'Premium', price: 'GHS 290', smsLimit: 7500 },
];

export default function DonorSMSSubscriptionPopup({
  funeral,
}: {
  funeral: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has no subscription and open the dialog
    if (!funeral?.subscription) {
      setIsOpen(true);
    }
  }, []);

  const handleSubscribe = (planId: string) => {
    console.log(`Subscribed to ${planId} plan`);
    // Here you would typically make an API call to update the user's subscription
    setIsOpen(false);
  };

  const handleCustomPlan = () => {
    console.log('Requested information about custom plan');
    // Here you would typically open a contact form or redirect to a contact page
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[425px] md:max-w-[700px] lg:max-w-7xl'>
        <DialogHeader>
          <DialogTitle>Choose Your Subscription Plan</DialogTitle>
          <DialogDescription>
            Select a plan based on your expected SMS notification volume to
            donors. You can upgrade at any time.
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <Card className='flex flex-col'>
            <CardHeader>
              <CardTitle className='text-2xl'>Basic Plan</CardTitle>
              <CardDescription>For those just starting out</CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <Check className='mr-2 h-4 w-4 text-green-500' />
                  Receive cash donations
                </li>
                <li className='flex items-center'>
                  <X className='mr-2 h-4 w-4 text-red-500' />
                  No thank you message for cash donations
                </li>
                <li className='flex items-center'>
                  <Check className='mr-2 h-4 w-4 text-green-500' />
                  Accept online donations
                </li>
                <li className='flex items-center'>
                  <Check className='mr-2 h-4 w-4 text-green-500' />
                  Automatic thank you message for online donations
                </li>
                <li className='flex items-center'>
                  <X className='mr-2 h-4 w-4 text-red-500' />
                  No appreciation message
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className='w-full'>Select Basic Plan</Button>
            </CardFooter>
          </Card>

          <Card className='flex flex-col border-primary'>
            <CardHeader>
              <CardTitle className='text-2xl'>Standard Plan</CardTitle>
              <CardDescription>
                Perfect for growing organizations
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <Check className='mr-2 h-4 w-4 text-green-500' />
                  All Basic Plan features
                </li>
                <li className='flex items-center'>
                  <Check className='mr-2 h-4 w-4 text-green-500' />
                  Thank you message for all donations
                </li>
                <li className='flex items-center'>
                  <Check className='mr-2 h-4 w-4 text-green-500' />
                  Appreciation message later
                </li>
                <li className='flex items-center'>
                  <Check className='mr-2 h-4 w-4 text-green-500' />
                  Limited to 3,000 messages
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className='w-full' variant='outline'>
                Select Standard Plan
              </Button>
            </CardFooter>
          </Card>

          <Card className='flex flex-col'>
            <CardHeader>
              <CardTitle className='text-2xl'>Premium Plan</CardTitle>
              <CardDescription>For established organizations</CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <Check className='mr-2 h-4 w-4 text-green-500' />
                  All Standard Plan features
                </li>
                <li className='flex items-center'>
                  <Check className='mr-2 h-4 w-4 text-green-500' />
                  Increased message limit
                </li>
                <li className='flex items-center'>
                  <Check className='mr-2 h-4 w-4 text-green-500' />
                  Up to 7,000 messages
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className='w-full'>Select Premium Plan</Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
