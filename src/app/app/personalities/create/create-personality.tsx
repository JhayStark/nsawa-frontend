'use client';

import { useCallback, useEffect, useMemo } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/ui/form-fields';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useCreatePersonalityMutation } from '@/lib/features/keyPersonsApiSlice';
import FuneralToolbar from '@/components/FuneralToolbar';
import { useSearchParams } from 'next/navigation';

// withdrawal details

const createPersonalitySchema = z.object({
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  relation: z.string(),
  funeralId: z.string(),
});

const CreatePersonality = () => {
  const searchParams = useSearchParams();
  const selectedFuneral = useMemo(
    () => searchParams.get('selected-funeral') || '',
    [searchParams]
  );
  const [createPersonality] = useCreatePersonalityMutation();
  const form = useForm<z.infer<typeof createPersonalitySchema>>({
    resolver: zodResolver(createPersonalitySchema),
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof createPersonalitySchema>) => {
      createPersonality(data)
        .unwrap()
        .then(res => console.log(res))
        .catch(err => console.log(err));
      // console.log(data);
    },
    []
  );

  useEffect(() => {
    form.setValue('funeralId', selectedFuneral);
  }, [selectedFuneral]);

  return (
    <div>
      <FuneralToolbar />
      <Form {...form}>
        <div className='space-y-10 max-w-3xl'>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5'
            id='create-personality-form'
          >
            <InputField
              form={form}
              placeholder='Name of Mourner'
              name='name'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Email of mourner'
              name='email'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Phone Number'
              name='phoneNumber'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Relation to deceased'
              name='relation'
              className='placeholder:text-gray-500'
            />
          </form>
          <Button
            className='bg-primary rounded-none h-16 w-48'
            form='create-personality-form'
          >
            Create Mourner
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreatePersonality;
