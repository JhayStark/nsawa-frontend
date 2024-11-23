interface SMSPlan {
  id: number;
  name: string;
  price: number;
  messages: number;
  features: string[];
}

export const smsPlanData: SMSPlan[] = [
  // {
  //   id: 1,
  //   name: 'Free',
  //   price: 0.0,
  //   messages: 10,
  //   features: ['Appreciation SMS', 'Automated thank you messages'],
  // },
  {
    id: 2,
    name: 'Basic',
    price: 99.99,
    messages: 700,
    features: ['Appreciation SMS', 'Automated thank you messages'],
  },
  {
    id: 3,
    name: 'Standard',
    price: 190,
    messages: 3000,
    features: ['Appreciation SMS', 'Automated thank you messages'],
  },
  {
    id: 4,
    name: 'Premium',
    price: 290,
    messages: 7500,
    features: ['Appreciation SMS', 'Automated thank you messages'],
  },
];
