'use client';

import Link from 'next/link';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '@/components/ui/form-fields';
import { Button } from '@/components/ui/button';
import {
  useVerifyResetOtpMutation,
  useSendResetOtpMutation,
} from '@/lib/features/auth/authApiSlice';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
});

const resetPasswordSchema = z
  .object({
    otp: z.string().min(4, { message: 'Enter a valid OTP' }),
    password: z.string().min(8, { message: 'Must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Must be at least 8 characters' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const LoginPartial = () => {
  const { toast } = useToast();
  const [sendResetOtp] = useSendResetOtpMutation();
  const [verifyResetOtp] = useVerifyResetOtpMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState('');

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const resetForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleSendOtp = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    await sendResetOtp(data)
      .unwrap()
      .then(() => {
        setIsLoading(false);
        setShowOtpInput(true);
        setEmail(data.email);
        loginForm.reset(); // Clear the email field
        toast({ title: 'OTP Sent' });
      })
      .catch(err => {
        setIsLoading(false);
        toast({
          title: err?.data?.message || 'Failed to send OTP',
          variant: 'destructive',
        });
      });
  };

  const handleResetPassword = async (
    data: z.infer<typeof resetPasswordSchema>
  ) => {
    setIsLoading(true);
    await verifyResetOtp({ ...data, email })
      .unwrap()
      .then(() => {
        setIsLoading(false);
        setShowOtpInput(false);
        resetForm.reset(); // Clear OTP and password fields after successful reset
        toast({ title: 'Password Reset Successfully' });
      })
      .catch(err => {
        setIsLoading(false);
        toast({
          title: err?.data?.message || 'Failed to verify OTP',
          variant: 'destructive',
        });
      });
  };

  return (
    <div className='font-poppins w-full lg:max-w-[550px] text-white space-y-10 lg:space-y-16'>
      <h2 className='font-bold text-4xl text-center lg:text-left lg:text-7xl'>
        Reset Password
      </h2>
      {showOtpInput ? (
        <Form {...resetForm}>
          <form
            className='space-y-2'
            onSubmit={resetForm.handleSubmit(handleResetPassword)}
            id='reset-form'
          >
            <input type='text' name='otp' className='hidden' />
            <InputField
              form={resetForm}
              name='otp'
              placeholder='OTP'
              className='text-white'
            />
            <InputField
              form={resetForm}
              name='password'
              placeholder='Password'
              type='password'
              className='text-white'
            />
            <InputField
              form={resetForm}
              name='confirmPassword'
              placeholder='Confirm password'
              type='password'
              className='text-white'
            />
          </form>
        </Form>
      ) : (
        <Form {...loginForm}>
          <form
            className='space-y-2'
            onSubmit={loginForm.handleSubmit(handleSendOtp)}
            id='login-form'
          >
            <InputField
              form={loginForm}
              name='email'
              placeholder='Email'
              className='text-white'
            />
          </form>
        </Form>
      )}
      <div className='space-y-14'>
        <div className='flex lg:flex-row flex-col items-center gap-y-3 lg:gap-8'>
          <Button
            className='rounded-none text-black bg-secondary px-11 py-6'
            form={showOtpInput ? 'reset-form' : 'login-form'}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : showOtpInput ? (
              <>Reset Password</>
            ) : (
              <>Send OTP</>
            )}
          </Button>
          <Link href='/auth/sign-up'>Don&apos;t have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPartial;
