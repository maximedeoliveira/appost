import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const BuildHeaderLoading = () => {
  return (
    <div className="animate-pulse">
      <Skeleton className="h-8 w-48" />
    </div>
  );
};

export default BuildHeaderLoading;
