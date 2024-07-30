'use client';

import { useCallback } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/ui/form-fields';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useCreateMutation } from '@/lib/features/funeralApiSlice';

// withdrawal details

const createFuneralSchema = z.object({
  nameOfDeceased: z.string(),
  ageOfDeceased: z.string(),
  phoneNumber: z.string(),
  funeralLocation: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date(),
});

const CreateFuneral = () => {
  const [createFuneral] = useCreateMutation();
  const form = useForm<z.infer<typeof createFuneralSchema>>({
    resolver: zodResolver(createFuneralSchema),
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof createFuneralSchema>) => {
      createFuneral(data)
        .unwrap()
        .then(res => console.log(res))
        .catch(err => console.log(err));
      // console.log(data);
    },
    []
  );

  return (
    <div>
      <Form {...form}>
        <div className='space-y-10 max-w-3xl'>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5'
            id='funeral-form'
          >
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
            <InputField
              form={form}
              placeholder='Start date'
              name='startDate'
              className='placeholder:text-gray-500'
              type='date'
            />
            <InputField
              form={form}
              placeholder='End date'
              name='endDate'
              className='placeholder:text-gray-500'
              type='date'
            />
          </form>
          <Button
            className='bg-primary rounded-none h-16 w-48'
            form='funeral-form'
          >
            Create Funeral
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateFuneral;
