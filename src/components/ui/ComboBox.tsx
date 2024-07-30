'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Combobox({
  data = [],
  label = 'Select option',
  filter,
  searchParams = false,
  multiSelect = false,
}: {
  data: any[];
  label: string;
  filter?: string;
  searchParams?: boolean;
  multiSelect?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [multiSelectValues, setMultiSelectValues] = useState<any[]>([]);

  const handleSelect = useCallback(
    (selectedValue: string) => {
      if (!filter) return;
      const params = new URLSearchParams(queryParams.toString());

      params.set(filter, selectedValue);

      // Construct the new URL
      const newUrl = `${pathname}?${params.toString()}`;
      // Push the new URL to the router
      router.push(newUrl);
    },
    [filter, queryParams, router, pathname]
  );

  const handleMultiSelect = useCallback(
    (selectedValue: string) => {
      // Update the filter parameter with the selected value
      if (!filter) return;
      const params = new URLSearchParams(queryParams.toString());

      params.set(filter, selectedValue);
      // Construct the new URL
      const newUrl = `${pathname}?${params.toString()}`;
      // Push the new URL to the router
      router.push(newUrl);
    },
    [filter, queryParams, router, pathname]
  );

  const handleCommandSelect = useCallback(
    (currentValue: string) => {
      const selectedFramework = data.find(
        framework =>
          framework.value.toLowerCase() === currentValue.toLowerCase()
      );
      const originalValue = selectedFramework?.value ?? '';

      if (multiSelect) {
        setMultiSelectValues((prev: any[]) => {
          const newValues = prev.includes(originalValue)
            ? prev.filter(item => item !== originalValue)
            : [...prev, originalValue];

          searchParams && handleMultiSelect(newValues.join());
          return newValues;
        });
      } else {
        setValue(originalValue);
        searchParams && handleSelect(originalValue);
      }

      setOpen(false);
    },
    [data, multiSelect, searchParams, handleSelect, handleMultiSelect]
  );

  useEffect(() => {
    if (!filter) return;
    const filterValue = queryParams.get(filter);
    if (filterValue && !multiSelect) {
      setValue(filterValue);
    } else if (multiSelect && filterValue) {
      setMultiSelectValues(filterValue.split(','));
    }
  }, []);

  const selectedValuesLabel = useMemo(() => {
    if (!multiSelectValues.length) return label;
    const existingDataValues = new Set(data.map(framework => framework.value));
    const filteredValues = multiSelectValues.filter(value =>
      existingDataValues.has(value)
    );
    return filteredValues.length ? `${filteredValues.join()}` : label;
  }, [multiSelectValues, data, label]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between truncate'
        >
          {!multiSelect
            ? value
              ? data.find(framework => framework.value === value)?.label
              : label
            : selectedValuesLabel}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px]   p-0'>
        <Command>
          <CommandInput placeholder='Search funeral...' />
          <CommandEmpty>No options found</CommandEmpty>
          <CommandGroup className='max-h-[400px] overflow-y-auto'>
            {data.map(framework => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={handleCommandSelect}
              >
                {multiSelect ? (
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      multiSelectValues.includes(framework?.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                ) : (
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                )}
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
