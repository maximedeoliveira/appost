import { and, eq } from 'drizzle-orm';

import { auth } from '@/auth';
import { db } from '@/db';
import { projects } from '@/db/schema';

type ProjectPageProps = {
  params: {
    projectId: string;
  };
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

const ProjectPage = async ({ params: { projectId } }: ProjectPageProps) => {
  const project = await getProjectById({ projectId });

  return (
    <div>
      <pre>{JSON.stringify(project)}</pre>
    </div>
  );
};

export default ProjectPage;
