import { LayoutIcon } from 'lucide-react';
import React from 'react';

import AddProjectModal from '@/components/dashboard/AddProjectModal';
import { Button } from '@/components/ui/button';

const NoProject = () => {
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <div className="inline-flex flex-col items-center gap-2">
        <div>
          <div className="inline-flex p-3 rounded-md bg-primary/30">
            <LayoutIcon className="text-primary" />
          </div>
        </div>
        <p className="text-md font-bold">
          You don&apos;t have any project yet !
        </p>
        <AddProjectModal>
          <Button className="mt-4">Add a project</Button>
        </AddProjectModal>
      </div>
    </div>
  );
};

export default NoProject;
