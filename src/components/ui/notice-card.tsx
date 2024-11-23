import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

const noticeCardVariants = cva('flex items-start gap-4 p-4', {
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      info: 'bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-200',
      success:
        'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-200',
      warning:
        'bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-200',
      error: 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const iconMap = {
  default: Info,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

export interface NoticeCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof noticeCardVariants> {
  title: string;
  description?: string;
  items?: string[];
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function NoticeCard({
  title,
  description,
  items,
  variant = 'default',
  icon,
  action,
  className,
  ...props
}: NoticeCardProps) {
  const IconComponent = iconMap[variant || 'default'];

  return (
    <Card className={cn(noticeCardVariants({ variant }), className)} {...props}>
      <CardContent className='flex items-start gap-4 p-0'>
        <div className='mt-1 shrink-0'>
          {icon || <IconComponent className='h-5 w-5' />}
        </div>
        <div className='grid gap-1'>
          <h3 className='font-semibold leading-none tracking-tight'>{title}</h3>
          {description && (
            <p className='text-sm [&_p]:leading-relaxed'>{description}</p>
          )}
          {items && items.length > 0 && (
            <ul className='mt-2 list-disc list-inside text-sm space-y-1'>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {action && <div className='mt-2'>{action}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
