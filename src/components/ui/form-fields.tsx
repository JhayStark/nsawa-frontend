'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from './input';
// import { Checkbox } from './checkbox';
import { useState } from 'react';

type FormProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  options?: { label: string; value: string }[];
  formItemClassName?: string;
};

export const ShadcnInputField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  className,
  type,
  formItemClassName,
}: FormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('', formItemClassName)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={field.value ?? ''}
              placeholder={placeholder}
              className={cn('', className)}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const InputField = <T extends FieldValues>({
  form,
  name,
  description,
  label,
  placeholder,
  className,
  type,
}: FormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <input
              {...field}
              value={field.value ?? ''}
              placeholder={placeholder}
              className={cn(
                'bg-inherit w-full focus:outline-none appearance-none border-b-[#D9D9D9] border-b-2 py-3 placeholder:text-[#FFF] ',
                className
              )}
              type={type}
            />
          </FormControl>
          {description && (
            <FormDescription className='text-blue-500'>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const DatePickerField = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  className,
  placeholder,
}: FormProps<T>) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'ghost'}
                  className={cn(
                    'w-full  rounded-none border-b-2 text-left font-normal border-b-[#D9D9D9] text-base px-0',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={date => {
                  field.onChange(date);
                  setIsPopoverOpen(false); // Close popover on date selection
                }}
                disabled={date => date < new Date('1900-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const SelectFormField = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder,
  className,
}: FormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            {...field}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  'bg-inherit w-full focus:outline-none border-0 rounded-none placeholder:text-lg font-sentient appearance-none border-b-[#D9D9D9] border-b-2 py-3 placeholder:text-[#FFF]',
                  className
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const ShadcnSelectFormField = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder,
  className,
  formItemClassName,
}: FormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>{label}</FormLabel>
          <Select
            {...field}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className={cn(className)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TextField = <T extends FieldValues>({
  form,
  name,
  description,
  label,
  placeholder,
  className,
  type,
}: FormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <textarea
              {...field}
              value={field.value ?? ''}
              placeholder={placeholder}
              className={cn(
                'bg-inherit w-full rounded focus:outline-none appearance-none border-b-[#D9D9D9] border-[1px] p-3 placeholder:text-[#FFF]',
                className
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const ShadcnCheckBox = <T extends FieldValues>({
  form,
  name,
  label,
}: FormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex items-center gap-x-2'>
          <FormControl>
            <div className='flex items-center space-x-2 py-2'>
              <input
                type='checkbox'
                name='announce'
                id='announce'
                value={field.value}
                onChange={field.onChange}
              />
              <label htmlFor='announce' className=''>
                I would like my donation to be announced.
              </label>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
