'use client';

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '@/components/ui/form-fields';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Enter a valid name' }),
    email: z.string().email({ message: 'Enter a valid email' }),
    password: z.string().min(8, { message: 'Must be above 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Must be above 8 characters' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

const SignUp = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = (data: any) => {
    console.log(data);
  };
  return (
    <div className='font-poppins w-full lg:max-w-[550px] text-white space-y-10 lg:space-y-16'>
      <h2 className='font-bold text-4xl text-center lg:text-left lg:text-7xl'>
        Sign Up
      </h2>
      <Form {...form}>
        <form
          className='space-y-1'
          id='sign-up-form'
          onSubmit={form.handleSubmit(handleSignUp)}
        >
          <InputField form={form} name='name' placeholder='Name' className='' />
          <InputField form={form} name='email' placeholder='Email' />
          <InputField form={form} name='password' placeholder='Password' />
          <InputField
            form={form}
            name='confirmPassword'
            placeholder='Confirm Password'
          />
        </form>
      </Form>
      <div className='space-y-14'>
        <div className='flex items-center gap-x-2'>
          <input type='checkbox' name='' id='' />
          <p className='text-sm'>
            I agree to the{' '}
            <Link href='/terms' className='font-bold'>
              Terms & Conditions ?
            </Link>
          </p>
        </div>{' '}
        <div className='flex lg:flex-row flex-col items-center gap-y-3 lg:gap-8'>
          <Button
            className='from-[#D9D9D9] bg-gradient-to-r rounded-none text-black to-[#FFE3AD] px-11  py-6'
            type='submit'
            form='sign-up-form'
          >
            Create Account
          </Button>
          <Link href='/auth' className='text-lg'>
            Have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
