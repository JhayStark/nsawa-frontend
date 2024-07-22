'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from './ui/form-fields';
import { Form } from './ui/form';
import { Button } from './ui/button';

const donationsSchema = z.object({
  nameOfdonor: z.string(),
  recipient: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  amount: z.number(),
});

const CashCollection = () => {
  const form = useForm<z.infer<typeof donationsSchema>>({
    resolver: zodResolver(donationsSchema),
  });
  return (
    <div className='border-2 border-primary rounded-lg p-5  h-[550px] flex justify-between flex-col'>
      <div>
        <h2 className='text-center text-lg font-semibold'>Recieve Donation</h2>
        <p className='text-sm text-center'>In Memory of `deceaseds name`</p>
      </div>
      <Form {...form}>
        <form action=''>
          <InputField
            form={form}
            name='nameOfdonor'
            placeholder='Donor name'
            className='placeholder:text-primary'
          />
          <InputField
            form={form}
            name='phoneNumber'
            placeholder='Donor mobile number'
            className='placeholder:text-primary'
          />
          <InputField
            form={form}
            name='email'
            placeholder='Donor email'
            className='placeholder:text-primary'
          />
          <InputField
            form={form}
            name='recipient'
            placeholder='Select chief mourner'
            className='placeholder:text-primary'
          />
          <InputField
            form={form}
            name='amount'
            placeholder='Amount recieved'
            className='placeholder:text-primary'
          />
        </form>
      </Form>
      <Button className='h-16 rounded-none w-full'>Recieve Donation</Button>
    </div>
  );
};

export default CashCollection;
