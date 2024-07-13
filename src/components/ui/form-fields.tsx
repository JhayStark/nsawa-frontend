import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';

type FormProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  fieldStyles?: string;
};

export const InputField = <T extends FieldValues>({
  form,
  name,
  description,
  label,
  placeholder,
  fieldStyles,
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
              placeholder={placeholder}
              className={cn(
                `${fieldStyles} bg-inherit w-full focus:outline-none appearance-none border-b-[#D9D9D9] border-b-2 py-3 placeholder:text-[#FFF]`
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
