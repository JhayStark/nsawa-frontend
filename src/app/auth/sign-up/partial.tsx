'use client';

import Link from 'next/link';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '@/components/ui/form-fields';
import { Button } from '@/components/ui/button';
import { useRegisterMutation } from '@/lib/features/auth/authApiSlice';
import { useAppDispatch } from '@/lib/hooks';
import { login } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [registerAccount] = useRegisterMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    await registerAccount({
      fullName: data.name,
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then(data => {
        setIsLoading(false);
        toast({ title: 'Logged In' });
        dispatch(login({ user: data }));
        router.replace('/app');
      })
      .catch(err => {
        setIsLoading(false);
        toast({
          title: err?.data?.message || 'Failed to login',
          variant: 'destructive',
        });
      });
  };
  return (
    <div className='font-poppins w-full lg:max-w-[550px] text-white space-y-5  sm:space-y-10 lg:space-y-16'>
      <h2 className='font-bold text-4xl text-center lg:text-left lg:text-7xl mt-10 lg:mt-0'>
        Sign Up
      </h2>
      <Form {...form}>
        <form
          className='space-y-2'
          id='sign-up-form'
          onSubmit={form.handleSubmit(handleSignUp)}
        >
          <InputField
            form={form}
            name='name'
            placeholder='Name'
            className='text-white'
          />
          <InputField
            form={form}
            name='email'
            placeholder='Email'
            className='text-white'
          />
          <InputField
            form={form}
            name='password'
            placeholder='Password'
            className='text-white'
          />
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
            className='rounded-none text-black bg-secondary px-11  py-6'
            type='submit'
            form='sign-up-form'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : (
              <>Create Account</>
            )}
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
