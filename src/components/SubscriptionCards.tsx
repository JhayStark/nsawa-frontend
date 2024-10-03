import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SubscriptionCards() {
  return (
    <div className='container mx-auto py-10'>
      <h2 className='text-3xl font-bold text-center mb-10'>Choose Your Plan</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
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
            <CardDescription>Perfect for growing organizations</CardDescription>
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
    </div>
  );
}
