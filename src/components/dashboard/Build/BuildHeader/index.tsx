import { and, eq } from 'drizzle-orm';
import { PlusIcon, SettingsIcon } from 'lucide-react';

import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { db } from '@/db';
import { projects } from '@/db/schema';

type BuildListHeaderProps = {
  projectId: string;
};

const getProjectById = async ({ projectId }: { projectId: string }) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return db.query.projects.findFirst({
    where: and(
      eq(projects.userId, session.user.id),
      eq(projects.id, projectId)
    ),
  });
};

const BuildHeader = async ({ projectId }: BuildListHeaderProps) => {
  const project = await getProjectById({ projectId });

  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-3xl font-bold">{project?.name}</h1>
      <div className="flex gap-2">
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add a build
        </Button>
        <Button variant="secondary">
          <SettingsIcon className="w-4 h-4 mr-2" /> Settings
        </Button>
      </div>
    </div>
  );
};

export default BuildHeader;
