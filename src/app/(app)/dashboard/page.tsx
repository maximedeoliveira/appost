import React, { Suspense } from 'react';

import ProjectList from '@/components/dashboard/Project/ProjectList';
import LoadingProjects from '@/components/dashboard/Project/ProjectListLoading';
import { Button } from '@/components/ui/button';

const DashboardPage = async () => {
  return (
    <div>
      <div className="flex flex-row justify-between pb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>Add a project</Button>
      </div>
      <Suspense fallback={<LoadingProjects />}>
        <ProjectList />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
