'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Mail, Phone, User, MessageSquare } from 'lucide-react';

export default function Page() {
  const [idVerified, setIdVerified] = useState(false);

  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // In a real application, you would handle the file upload here
    // For this example, we'll just simulate a successful verification
    if (event.target.files && event.target.files.length > 0) {
      setTimeout(() => setIdVerified(true), 1500);
    }
  };

  return (
    <div className='max-w-4xl py-10'>
      {/* <h1 className='text-3xl font-bold mb-6'>Profile</h1> */}
      <div className='grid gap-6 '>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details here.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <div className='flex'>
                <User className='w-4 h-4 mr-2 mt-3 text-muted-foreground' />
                <Input id='name' placeholder='John Doe' />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone Number</Label>
              <div className='flex'>
                <Phone className='w-4 h-4 mr-2 mt-3 text-muted-foreground' />
                <Input id='phone' type='tel' placeholder='+1 (555) 123-4567' />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email Address</Label>
              <div className='flex'>
                <Mail className='w-4 h-4 mr-2 mt-3 text-muted-foreground' />
                <Input
                  id='email'
                  type='email'
                  placeholder='john.doe@example.com'
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ID Verification</CardTitle>
            <CardDescription>
              Upload your ID card for verification.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='id-upload'>Upload ID Card</Label>
              <Input
                id='id-upload'
                type='file'
                accept='image/*'
                onChange={handleIdUpload}
                className='file:mr-4  file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80'
              />
            </div>
            {idVerified && (
              <div className='text-sm font-medium text-green-600'>
                ID verified successfully!
              </div>
            )}
          </CardContent>
        </Card>

        {/* <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>
              Choose a plan that suits your needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue='basic'>
              <div className='grid gap-6 md:grid-cols-3'>
                <div>
                  <RadioGroupItem
                    value='basic'
                    id='basic'
                    className='peer sr-only'
                  />
                  <Label
                    htmlFor='basic'
                    className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                  >
                    <MessageSquare className='mb-3 h-6 w-6' />
                    <span className='text-lg font-semibold'>Basic</span>
                    <span className='mt-1 text-xl font-bold'>GHS 99.99</span>
                    <span className='mt-2 text-sm text-center text-muted-foreground'>
                      Up to 700 SMS notifications to donors
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value='pro'
                    id='pro'
                    className='peer sr-only'
                  />
                  <Label
                    htmlFor='pro'
                    className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                  >
                    <MessageSquare className='mb-3 h-6 w-6' />
                    <span className='text-lg font-semibold'>Pro</span>
                    <span className='mt-1 text-xl font-bold'>GHS 190.99</span>
                    <span className='mt-2 text-sm text-center text-muted-foreground'>
                      Up to 3000 SMS notifications to donors
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value='enterprise'
                    id='enterprise'
                    className='peer sr-only'
                  />
                  <Label
                    htmlFor='enterprise'
                    className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                  >
                    <MessageSquare className='mb-3 h-6 w-6' />
                    <span className='text-lg font-semibold'>Enterprise</span>
                    <span className='mt-1 text-xl font-bold'>GHS 299.99</span>
                    <span className='mt-2 text-sm text-center text-muted-foreground'>
                      Unlimited (7500) SMS notifications to donors
                    </span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card> */}
      </div>
      <div className='mt-6 flex justify-end'>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
