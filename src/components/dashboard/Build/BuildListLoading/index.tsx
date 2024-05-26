import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const BuildListLoading = () => {
  return (
    <Table className="animate-pulse">
      <TableHeader>
        <TableRow>
          <TableHead>Platform</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Environment</TableHead>
          <TableHead className="text-right" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 4 })
          .fill(1)
          .map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell className="text-right" />
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default BuildListLoading;
