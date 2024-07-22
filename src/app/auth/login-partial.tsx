'use client';

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '@/components/ui/form-fields';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(8, { message: 'Must be above 8 characters' }),
});

const LoginPartial = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  return (
    <div className='font-poppins w-full lg:max-w-[550px] text-white space-y-10 lg:space-y-16'>
      <h2 className='font-bold text-4xl text-center lg:text-left lg:text-7xl'>
        Login
      </h2>
      <Form {...form}>
        <form className='space-y-2'>
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
          <Button className=' rounded-none text-black bg-secondary px-11  py-6'>
            Login
          </Button>
          <Link href='/auth/sign-up'>Don&apos;t have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPartial;
