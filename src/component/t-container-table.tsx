'use client';

import * as React from 'react';

import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/component/shadcn-ui/table';
import { cn } from '@/lib/shadcn.lib';

const TContainerTable = ({
  className,
  ...props
}: React.ComponentProps<'table'>) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto scrollbar-always border-t border-t-black"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
};

export {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TContainerTable,
};
