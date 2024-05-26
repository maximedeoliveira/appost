import React from 'react';

import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingProjects = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 4 })
        .fill(1)
        .map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <Skeleton className="h-6 w-64" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default LoadingProjects;
