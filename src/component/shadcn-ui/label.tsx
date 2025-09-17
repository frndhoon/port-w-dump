'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { cn } from '@/lib/shadcn.lib';

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  variant?: 'default' | 'custom';
}

const Label = ({ className, variant = 'default', ...props }: LabelProps) => {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        variant === 'custom' && 'cursor-pointer',
        className
      )}
      {...props}
    />
  );
};

export { Label };
