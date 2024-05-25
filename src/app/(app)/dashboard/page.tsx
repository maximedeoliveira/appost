import { eq } from 'drizzle-orm';
import Link from 'next/link';
import React from 'react';

import NoProject from '@/app/(app)/dashboard/_components/NoProject';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { db } from '@/db';
import { projects } from '@/db/schema';

const getAllProjects = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return db.query.projects.findMany({
    where: eq(projects.userId, session.user.id),
  });
};

const DashboardPage = async () => {
  const projects = await getAllProjects();

  if (projects.length === 0) {
    return <NoProject />;
  }

  return (
    <div>
      <div className="flex flex-row justify-between pb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button>Add a project</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <p className="font-bold">{project.name}</p>
            </CardHeader>
            <CardFooter>
              <Link href={`/dashboard/${project.id}`}>
                <Button>Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
