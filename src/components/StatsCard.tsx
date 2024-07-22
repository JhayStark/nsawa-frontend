import React from 'react';
import { cn } from '@/lib/utils';
import { CircleArrowUp } from 'lucide-react';

const StatsCard = ({
  className,
  title,
  text,
}: {
  className?: string;
  title?: string;
  text?: string;
}) => {
  return (
    <div
      className={cn(
        ` font-sentient px-5 2xl:px-11 py-4 rounded-[20px] md:space-y-3 ${className}`
      )}
    >
      <div className='flex items-center mb-3 md:mb-0'>
        <p className='font-semibold lg:text-base '>{title}</p>
        <CircleArrowUp className='rotate-45 ml-auto' />
      </div>
      <h3 className='md:text-3xl font-semibold'>{text}</h3>
      <p className='text-xs'>Updated 1 min ago</p>
    </div>
  );
};

export default StatsCard;
