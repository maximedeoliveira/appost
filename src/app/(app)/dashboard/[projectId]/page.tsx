import React, { Suspense } from 'react';

import BuildHeaderLoading from '@/components/dashboard/Build/BuidlHeaderLoading';
import BuildHeader from '@/components/dashboard/Build/BuildHeader';
import BuildList from '@/components/dashboard/Build/BuildList';
import BuildListLoading from '@/components/dashboard/Build/BuildListLoading';

type ProjectPageProps = {
  params: {
    projectId: string;
  };
};

const ProjectPage = ({ params: { projectId } }: ProjectPageProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<BuildHeaderLoading />}>
        <BuildHeader projectId={projectId} />
      </Suspense>
      <Suspense fallback={<BuildListLoading />}>
        <BuildList projectId={projectId} />
      </Suspense>
    </div>
  );
};

export default ProjectPage;
