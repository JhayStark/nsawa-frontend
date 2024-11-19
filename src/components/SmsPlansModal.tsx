'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Check } from 'lucide-react';
import Payment from './Payment';

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

export default function SmsPlansModal({
  isOpen = true,
  onClose = () => {},
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isPlanSelected, setIsPlanSelected] = useState(false);

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
    // Here you would typically handle the purchase process
    console.log(`Selected plan:GHS{planName}`);
    // Close the modal after selection
    setIsPlanSelected(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[900px]'>
        {!isPlanSelected && (
          <DialogHeader>
            <DialogTitle>Final Step: Choose Your SMS Plan</DialogTitle>
            <DialogDescription>
              Select an SMS plan, this helps you make your donors feel
              appreciated
            </DialogDescription>
          </DialogHeader>
        )}
        {!isPlanSelected ? (
          <div className='grid gap-4 py-4 md:grid-cols-3'>
            {smsPlanData.map(plan => (
              <Card
                key={plan.name}
                className={`${
                  selectedPlan === plan.name ? 'border-primary' : ''
                }`}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>GHS{plan.price.toFixed(2)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='mb-2 font-semibold'>{plan.messages} messages</p>
                  <ul className='space-y-1'>
                    {plan.features.map((feature, index) => (
                      <li key={index} className='flex items-center'>
                        <Check className='mr-2 h-4 w-4 text-primary' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className='w-full'
                    onClick={() => handlePlanSelection(plan.name)}
                  >
                    Select {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Payment selectedPlan={selectedPlan} />
        )}
      </DialogContent>
    </Dialog>
  );
}
