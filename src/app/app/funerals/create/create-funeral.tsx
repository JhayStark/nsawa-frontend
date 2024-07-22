'use client';

import { useCallback } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/ui/form-fields';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

// withdrawal details

const createFuneralSchema = z.object({
  nameOfFuneral: z.string(),
  nameOfDeceased: z.string(),
  ageOfDeceased: z.string(),
  phoneNumber: z.string(),
  funeralLocation: z.string(),
  startDate: z.date(),
  endDate: z.string(),
});

const CreateFuneral = () => {
  const form = useForm<z.infer<typeof createFuneralSchema>>({
    resolver: zodResolver(createFuneralSchema),
  });

  const onSubmit = useCallback((data: z.infer<typeof createFuneralSchema>) => {
    console.log(data);
  }, []);

  return (
    <div>
      <Form {...form}>
        <div className='space-y-10 max-w-3xl'>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <InputField
              form={form}
              placeholder='Name of Funeral'
              name='nameOfFuneral'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Name of Deceased'
              name='nameOfDeceased'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Age of Deceased'
              name='ageOfDeceased'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Designated Phone Number for Funeral'
              name='phoneNumber'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Funeral location'
              name='funeralLocation'
              className='placeholder:text-gray-500'
            />
          </form>
          <Button className='bg-primary rounded-none h-16 w-48'>
            Create Funeral
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateFuneral;
