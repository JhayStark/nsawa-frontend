'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField, SelectFormField } from './ui/form-fields';
import { Form } from './ui/form';
import { Button } from './ui/button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCreatePersonalityMutation } from '@/lib/features/keyPersonsApiSlice';
import { CircleX, UserPlus } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useSearchParams } from 'next/navigation';

const createPersonalitySchema = z.object({
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  relation: z.string(),
  funeralId: z.string(),
});

const AddMourner = ({ funeralDetails }: { funeralDetails: any }) => {
  const searchParams = useSearchParams();
  const openForm = searchParams.get('sub-form') || '';
  const params = new URLSearchParams(searchParams.toString());
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
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    params.set('sub-form', 'add-mourner');
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`
    );
  };

  const handleClose = () => {
    params.delete('sub-form');
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`
    );
  };

  useEffect(() => {
    form.setValue('funeralId', selectedFuneral);
  }, [selectedFuneral]);

  return (
    <Collapsible
      open={openForm == 'add-mourner'}
      onOpenChange={handleOpen}
      className=''
    >
      <CollapsibleTrigger asChild>
        {openForm !== 'add-mourner' && (
          <Button
            className='h-14 space-x-5 w-full border-primary'
            variant='outline'
          >
            <UserPlus />
            <p className='text-lg'>Add Chief Mourner</p>
          </Button>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='border-2 border-primary rounded-lg p-5  h-[500px] flex justify-between flex-col'>
          <div className='relative'>
            <h2 className='text-center text-lg font-semibold'>
              Add Chief Mourner
            </h2>
            <p className='text-sm text-center'>
              In Memory of {funeralDetails?.nameOfDeceased}
            </p>
            <CircleX
              className='absolute top-0 right-0 text-red-500 cursor-pointer'
              onClick={() => handleClose()}
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-5'
              id='create-mourner-form'
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
          </Form>
          <Button
            className='h-16 rounded-none w-full'
            form='create-mourner-form'
          >
            Add Mourner
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AddMourner;
