'use client';

import Link from 'next/link';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '@/components/ui/form-fields';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/hooks';
import { login } from '@/lib/features/auth/authSlice';
import { useLoginMutation } from '@/lib/features/auth/authApiSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(8, { message: 'Must be above 8 characters' }),
});

const LoginPartial = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [loginAccount] = useLoginMutation();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    await loginAccount(data)
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
    <div className='font-poppins w-full lg:max-w-[550px] text-white space-y-10 lg:space-y-16'>
      <h2 className='font-bold text-4xl text-center lg:text-left lg:text-7xl'>
        Login
      </h2>
      <Form {...form}>
        <form
          className='space-y-2'
          onSubmit={form.handleSubmit(handleLogin)}
          id='login-form'
        >
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
        </form>
      </Form>
      <div className='space-y-14'>
        <div className='flex items-center gap-x-2'>
          <input type='checkbox' name='' id='' />
          <p className='text-sm'>Remember Me</p>
        </div>
        <div className='flex lg:flex-row flex-col items-center gap-y-3 lg:gap-8'>
          <Button
            className=' rounded-none text-black bg-secondary px-11  py-6'
            form='login-form'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : (
              <>Login</>
            )}
          </Button>
          <Link href='/auth/sign-up'>Don&apos;t have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPartial;
